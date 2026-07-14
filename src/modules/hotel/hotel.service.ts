import mongoose from "mongoose";
import { HotelInfoModel, HotelRoomModel, HotelAmenityModel } from "./hotel.model";
import { IHotelInfo, IHotelRoom, IHotelAmenity } from "./hotel.interface";

const createHotelIntoDB = async (payload: {
    hotelInfo: IHotelInfo;
    rooms: IHotelRoom[];
    amenities: IHotelAmenity[];
}) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // 1. Create Hotel Info
        const createdHotelInfo = await HotelInfoModel.create([payload.hotelInfo], { session });
        const hotelId = createdHotelInfo[0]._id;

        // 2. Create Hotel Rooms
        if (payload.rooms && payload.rooms.length > 0) {
            const roomsWithHotelId = payload.rooms.map(room => ({
                ...room,
                hotelId
            }));
            await HotelRoomModel.insertMany(roomsWithHotelId, { session });
        }

        // 3. Create Hotel Amenities
        if (payload.amenities && payload.amenities.length > 0) {
            const amenitiesWithHotelId = payload.amenities.map(amenity => ({
                ...amenity,
                hotelId
            }));
            await HotelAmenityModel.insertMany(amenitiesWithHotelId, { session });
        }

        await session.commitTransaction();
        await session.endSession();

        return createdHotelInfo[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};

const getAllHotelsFromDB = async (filter: Record<string, any> = {}) => {
    // Optionally fetch related rooms to get price info
    const hotels = await HotelInfoModel.find(filter).lean();
    return hotels;
};

const getSingleHotelFromDB = async (id: string) => {
    const hotelInfo = await HotelInfoModel.findById(id).populate("ownerId", "name email phone role").lean();
    if (!hotelInfo) {
        throw new Error("Hotel not found");
    }

    const amenities = await HotelAmenityModel.find({ hotelId: id }).lean();
    const rooms = await HotelRoomModel.find({ hotelId: id }).lean();

    return {
        hotelInfo,
        rooms,
        amenities
    };
};

const toggleHotelFeaturedIntoDB = async (id: string, isFeatured: boolean) => {
    const hotel = await HotelInfoModel.findByIdAndUpdate(id, { isFeatured }, { new: true });
    if (!hotel) {
        throw new Error("Hotel not found");
    }
    return hotel;
};

const updateHotelIntoDB = async (id: string, payload: {
    hotelInfo?: Partial<IHotelInfo>;
    rooms?: IHotelRoom[];
    amenities?: IHotelAmenity[];
}) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        let updatedHotelInfo = await HotelInfoModel.findById(id);
        if (!updatedHotelInfo) throw new Error("Hotel not found");

        if (payload.hotelInfo) {
            updatedHotelInfo = await HotelInfoModel.findByIdAndUpdate(id, payload.hotelInfo, { new: true, session });
        }
        
        if (payload.rooms) {
            await HotelRoomModel.deleteMany({ hotelId: id }, { session });
            const roomsWithHotelId = payload.rooms.map(room => ({
                ...room,
                hotelId: id
            }));
            await HotelRoomModel.insertMany(roomsWithHotelId, { session });
        }

        if (payload.amenities) {
            await HotelAmenityModel.deleteMany({ hotelId: id }, { session });
            const amenitiesWithHotelId = payload.amenities.map(amenity => ({
                ...amenity,
                hotelId: id
            }));
            await HotelAmenityModel.insertMany(amenitiesWithHotelId, { session });
        }

        await session.commitTransaction();
        await session.endSession();

        return updatedHotelInfo;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};

const HotelService = {
    createHotelIntoDB,
    updateHotelIntoDB,
    getAllHotelsFromDB,
    getSingleHotelFromDB,
    toggleHotelFeaturedIntoDB,
};

export default HotelService;
