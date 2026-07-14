import { model, Schema } from "mongoose";
import { EPropertyType, IProperty } from "./property.interface";

const PropertySchema = new Schema<IProperty>(
    {
        name: {
            type: String,
            required: [true, "Property name is required."],
            trim: true,
        },
        type: {
            type: String,
            enum: Object.values(EPropertyType),
            required: [true, "Property type is required."],
        },
        location: {
            type: String,
            required: [true, "Location is required."],
            trim: true,
        },
        pricePerNight: {
            type: Number,
            required: [true, "Price per night is required."],
        },
        description: {
            type: String,
            trim: true,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        images: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

const PropertyModel = model<IProperty>("Property", PropertySchema);
export default PropertyModel;
