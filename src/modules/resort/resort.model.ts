import { model, Schema } from "mongoose";
import { IResortInfo } from "./resort.interface";

const RoomTypeSchema = new Schema({
    roomType: { type: String, required: true },
    count: { type: Number, required: true },
    occupancy: { type: Number, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] }
});

const ResortInfoSchema = new Schema<IResortInfo>(
    {
        propertyName: { type: String, required: true },
        address: {
            country: { type: String, required: true },
            state: { type: String, default: "" },
            city: { type: String, required: true },
            addressLine: { type: String, required: true }
        },
        description: { type: String, required: true },
        starRating: { type: Number, required: true },
        roomTypes: { type: [RoomTypeSchema], default: [] },
        features: { type: [String], default: [] },
        activities: { type: [String], default: [] },
        policies: {
            checkinTime: { type: String, required: true },
            checkoutTime: { type: String, required: true },
            minStay: { type: Number, required: true },
            cancellationPolicy: { type: String, required: true }
        },
        contact: {
            contactName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            website: { type: String }
        },
        images: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
        ownerId: { type: Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export const ResortInfoModel = model<IResortInfo>("ResortInfo", ResortInfoSchema);
