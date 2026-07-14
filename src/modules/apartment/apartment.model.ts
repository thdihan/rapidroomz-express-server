import { model, Schema } from "mongoose";
import { IApartmentInfo } from "./apartment.interface";

const ApartmentInfoSchema = new Schema<IApartmentInfo>(
    {
        propertyName: { type: String, required: true },
        address: {
            country: { type: String, required: true },
            state: { type: String, default: "" },
            city: { type: String, required: true },
            addressLine: { type: String, required: true }
        },
        description: { type: String, required: true },
        apartmentType: { type: String, required: true },
        propertyDetails: {
            bedrooms: { type: Number, required: true },
            bathrooms: { type: Number, required: true },
            floorArea: { type: Number, required: true },
            floorLevel: { type: Number, required: true },
            maxOccupancy: { type: Number, required: true },
            basePrice: { type: Number, required: true },
        },
        amenities: { type: [String], default: [] },
        buildingFeatures: { type: [String], default: [] },
        policies: {
            checkinTime: { type: String, required: true },
            checkoutTime: { type: String, required: true },
            minStay: { type: Number, required: true },
            cancellationPolicy: { type: String, required: true },
            houseRules: { type: String },
        },
        contact: {
            contactName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            altPhone: { type: String },
        },
        images: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export const ApartmentInfoModel = model<IApartmentInfo>("ApartmentInfo", ApartmentInfoSchema);
