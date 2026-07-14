import { model, Schema } from "mongoose";
import { IHotelInfo, IHotelRoom, IHotelAmenity } from "./hotel.interface";

const HotelInfoSchema = new Schema<IHotelInfo>(
    {
        name: { type: String, required: true },
        starRating: { type: Number, required: true },
        address: {
            country: { type: String, required: true },
            state: { type: String, default: "" },
            city: { type: String, required: true },
            addressLine: { type: String, required: true }
        },
        description: { type: String, required: true },
        currencies: { type: [String], required: true },
        policies: {
            checkinTime: { type: String, required: true },
            checkoutTime: { type: String, required: true },
            cancellationPolicy: { type: String, required: true },
            paymentMethods: { type: [String], default: [] },
        },
        contact: {
            contactName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            website: { type: String },
        },
        images: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const HotelRoomSchema = new Schema<IHotelRoom>(
    {
        hotelId: { type: Schema.Types.ObjectId, ref: "HotelInfo", required: true },
        roomType: { type: String, required: true },
        name: { type: String },
        capacity: { type: Number, required: true },
        count: { type: Number, required: true },
        publishedRate: { type: Number, required: true },
        agencyRate: { type: Number, required: true },
        images: { type: [String], default: [] },
    },
    { timestamps: true }
);

const HotelAmenitySchema = new Schema<IHotelAmenity>(
    {
        hotelId: { type: Schema.Types.ObjectId, ref: "HotelInfo", required: true },
        name: { type: String, required: true },
        isEnabled: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const HotelInfoModel = model<IHotelInfo>("HotelInfo", HotelInfoSchema);
export const HotelRoomModel = model<IHotelRoom>("HotelRoom", HotelRoomSchema);
export const HotelAmenityModel = model<IHotelAmenity>("HotelAmenity", HotelAmenitySchema);
