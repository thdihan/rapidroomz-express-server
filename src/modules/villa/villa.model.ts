import { model, Schema } from "mongoose";
import { IVillaInfo } from "./villa.interface";

const VillaInfoSchema = new Schema<IVillaInfo>(
    {
        propertyName: { type: String, required: true },
        address: {
            country: { type: String, required: true },
            state: { type: String, default: "" },
            city: { type: String, required: true },
            addressLine: { type: String, required: true }
        },
        description: { type: String, required: true },
        villaType: { type: String, required: true },
        propertyDetails: {
            bedrooms: { type: Number, required: true },
            bathrooms: { type: Number, required: true },
            indoorArea: { type: Number, required: true },
            outdoorArea: { type: Number },
            maxOccupancy: { type: Number, required: true },
            basePrice: { type: Number, required: true },
        },
        indoorAmenities: { type: [String], default: [] },
        outdoorFeatures: { type: [String], default: [] },
        services: { type: [String], default: [] },
        policies: {
            checkinTime: { type: String, required: true },
            checkoutTime: { type: String, required: true },
            minStay: { type: Number, required: true },
            cancellationPolicy: { type: String, required: true },
            specialRequirements: { type: String },
        },
        contact: {
            managerName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            emergencyPhone: { type: String },
        },
        images: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export const VillaInfoModel = model<IVillaInfo>("VillaInfo", VillaInfoSchema);
