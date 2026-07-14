import { BookingModel } from "./booking.model";
import { IBooking } from "./booking.interface";
import PropertyModel from "../property/property.model";
import { HotelInfoModel } from "../hotel/hotel.model";
import { ResortInfoModel } from "../resort/resort.model";
import { VillaInfoModel } from "../villa/villa.model";
import { ApartmentInfoModel } from "../apartment/apartment.model";
const generateShortUuid = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const createBooking = async (payload: any) => {
    const bookingId = `B-${generateShortUuid()}`;
    const result = await BookingModel.create({
        ...payload,
        bookingId
    });
    return result;
};

const getUserBookings = async (userId: string) => {
    const result = await BookingModel.find({ userId }).sort({ createdAt: -1 });
    return result;
};

const getOwnerBookings = async (ownerId: string) => {
    // Collect properties from the generic PropertyModel and all specific models
    const properties = await PropertyModel.find({ ownerId }).select('_id');
    const hotels = await HotelInfoModel.find({ ownerId }).select('_id');
    const resorts = await ResortInfoModel.find({ ownerId }).select('_id');
    const villas = await VillaInfoModel.find({ ownerId }).select('_id');
    const apartments = await ApartmentInfoModel.find({ ownerId }).select('_id');

    const propertyIds = [
        ...properties,
        ...hotels,
        ...resorts,
        ...villas,
        ...apartments
    ].map(p => p._id.toString());

    const result = await BookingModel.find({ propertyId: { $in: propertyIds } }).sort({ createdAt: -1 });
    return result;
};

const updateBookingStatus = async (bookingId: string, payload: Partial<Pick<IBooking, "status" | "paymentStatus">>) => {
    const updated = await BookingModel.findOneAndUpdate(
        { bookingId },
        { $set: payload },
        { new: true }
    );
    return updated;
};

const getPropertyAvailability = async (propertyId: string, checkIn: string, checkOut: string) => {
    // Find all active bookings for this property that overlap with the requested dates
    const overlappingBookings = await BookingModel.find({
        propertyId,
        status: { $ne: "Cancelled" },
        selectedRooms: {
            $elemMatch: {
                checkIn: { $lt: checkOut },
                checkOut: { $gt: checkIn }
            }
        }
    }).lean();

    const bookedRooms: Record<string, number> = {};
    let isSinglePropertyBooked = false;

    for (const booking of overlappingBookings) {
        if (booking.propertyType === 'villa' || booking.propertyType === 'apartment') {
            isSinglePropertyBooked = true;
        } else {
            for (const room of booking.selectedRooms) {
                // Ensure this specific room in the booking array actually overlaps
                if (room.checkIn < checkOut && room.checkOut > checkIn) {
                    const roomId = room.room?._id?.toString() || 'unknown';
                    bookedRooms[roomId] = (bookedRooms[roomId] || 0) + (room.noOfRooms || 1);
                }
            }
        }
    }

    return {
        bookedRooms,
        isSinglePropertyBooked
    };
};

export const BookingService = {
    createBooking,
    getUserBookings,
    getOwnerBookings,
    getAllBookings: async () => {
        return await BookingModel.find().sort({ createdAt: -1 });
    },
    updateBookingStatus,
    getPropertyAvailability,
};
