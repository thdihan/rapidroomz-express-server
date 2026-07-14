import { BookingModel } from "../booking/booking.model";
import { HotelInfoModel, HotelRoomModel } from "../hotel/hotel.model";
import { ResortInfoModel } from "../resort/resort.model";
import { VillaInfoModel } from "../villa/villa.model";
import { ApartmentInfoModel } from "../apartment/apartment.model";

export interface ISearchParams {
    checkIn: string;
    checkOut: string;
    guests: number;
    location?: string;
    type?: string;
}

const searchProperties = async (params: ISearchParams) => {
    const { checkIn, checkOut, guests, location, type } = params;

    // 1. Find overlapping bookings
    // We look for any booking that is NOT cancelled, and where checkIn < requestedCheckOut AND checkOut > requestedCheckIn
    const overlappingBookings = await BookingModel.find({
        status: { $ne: "Cancelled" },
        selectedRooms: {
            $elemMatch: {
                checkIn: { $lt: checkOut },
                checkOut: { $gt: checkIn }
            }
        }
    }).lean();

    // Group overlapping room bookings by propertyId to easily calculate consumed capacity
    const bookedRoomsByProperty: Record<string, { roomId?: string; noOfRooms: number }[]> = {};
    const bookedSinglePropertyIds = new Set<string>();

    for (const booking of overlappingBookings) {
        if (booking.propertyType === 'villa' || booking.propertyType === 'apartment') {
            bookedSinglePropertyIds.add(booking.propertyId);
        } else {
            if (!bookedRoomsByProperty[booking.propertyId]) {
                bookedRoomsByProperty[booking.propertyId] = [];
            }
            // For hotels and resorts, aggregate the booked rooms
            for (const room of booking.selectedRooms) {
                // Verify this specific room overlaps, because a booking might have multiple rooms with different dates
                if (room.checkIn < checkOut && room.checkOut > checkIn) {
                    bookedRoomsByProperty[booking.propertyId].push({
                        roomId: room.room?._id?.toString(),
                        noOfRooms: room.noOfRooms || 1
                    });
                }
            }
        }
    }

    const results = [];

    // Base filter for location
    const locationFilter: any = {};
    if (location) {
        // Simple regex search on address fields or name
        const regex = new RegExp(location, "i");
        locationFilter.$or = [
            { "address.city": regex },
            { "address.country": regex },
            { propertyName: regex },
            { name: regex } // Hotel uses name
        ];
    }

    // 2. Fetch & filter Hotels
    if (!type || type === "hotel") {
        const hotels = await HotelInfoModel.find(locationFilter).lean();
        for (const hotel of hotels) {
            const hotelId = hotel._id.toString();
            const rooms = await HotelRoomModel.find({ hotelId }).lean();
            
            let availableCapacity = 0;
            const bookedForThisHotel = bookedRoomsByProperty[hotelId] || [];

            for (const room of rooms) {
                const roomId = room._id.toString();
                const totalRooms = room.count;
                // Sum all booked instances of this room
                const bookedCount = bookedForThisHotel
                    .filter(b => b.roomId === roomId)
                    .reduce((sum, b) => sum + b.noOfRooms, 0);

                const availableCount = Math.max(0, totalRooms - bookedCount);
                availableCapacity += availableCount * room.capacity;
            }

            if (availableCapacity >= guests) {
                results.push({
                    _id: hotelId,
                    name: hotel.name,
                    type: "hotel",
                    address: hotel.address,
                    images: hotel.images,
                    starRating: hotel.starRating,
                    description: hotel.description,
                    availableCapacity,
                    minPrice: rooms.length > 0 ? Math.min(...rooms.map(r => r.publishedRate)) : 0
                });
            }
        }
    }

    // 3. Fetch & filter Resorts
    if (!type || type === "resort") {
        const resorts = await ResortInfoModel.find(locationFilter).lean();
        for (const resort of resorts) {
            const resortId = resort._id.toString();
            const roomTypes = resort.roomTypes || [];
            
            let availableCapacity = 0;
            const bookedForThisResort = bookedRoomsByProperty[resortId] || [];

            for (const room of roomTypes) {
                const roomId = (room as any)._id?.toString();
                const totalRooms = room.count;
                const bookedCount = bookedForThisResort
                    .filter(b => b.roomId === roomId)
                    .reduce((sum, b) => sum + b.noOfRooms, 0);

                const availableCount = Math.max(0, totalRooms - bookedCount);
                availableCapacity += availableCount * room.occupancy;
            }

            if (availableCapacity >= guests) {
                results.push({
                    _id: resortId,
                    name: resort.propertyName,
                    type: "resort",
                    address: resort.address,
                    images: resort.images,
                    starRating: resort.starRating,
                    description: resort.description,
                    availableCapacity,
                    minPrice: roomTypes.length > 0 ? Math.min(...roomTypes.map(r => r.price)) : 0
                });
            }
        }
    }

    // 4. Fetch & filter Villas
    if (!type || type === "villa") {
        const villas = await VillaInfoModel.find(locationFilter).lean();
        for (const villa of villas) {
            const villaId = villa._id.toString();
            
            // If it's already booked for the overlapping dates, skip
            if (bookedSinglePropertyIds.has(villaId)) continue;

            const maxCapacity = villa.propertyDetails?.maxOccupancy || 0;
            if (maxCapacity >= guests) {
                results.push({
                    _id: villaId,
                    name: villa.propertyName,
                    type: "villa",
                    address: villa.address,
                    images: villa.images,
                    description: villa.description,
                    availableCapacity: maxCapacity,
                    minPrice: villa.propertyDetails?.basePrice || 0
                });
            }
        }
    }

    // 5. Fetch & filter Apartments
    if (!type || type === "apartment") {
        const apartments = await ApartmentInfoModel.find(locationFilter).lean();
        for (const apartment of apartments) {
            const aptId = apartment._id.toString();
            
            if (bookedSinglePropertyIds.has(aptId)) continue;

            const maxCapacity = apartment.propertyDetails?.maxOccupancy || 0;
            if (maxCapacity >= guests) {
                results.push({
                    _id: aptId,
                    name: apartment.propertyName,
                    type: "apartment",
                    address: apartment.address,
                    images: apartment.images,
                    description: apartment.description,
                    availableCapacity: maxCapacity,
                    minPrice: apartment.propertyDetails?.basePrice || 0
                });
            }
        }
    }

    // Sort by price by default, could be parametrized
    return results.sort((a, b) => a.minPrice - b.minPrice);
};

export const SearchService = {
    searchProperties
};
