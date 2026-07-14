import { Document, Types } from "mongoose";

export interface IVillaInfo extends Document {
    propertyName: string;
    address: {
        country: string;
        state?: string;
        city: string;
        addressLine: string;
    };
    description: string;
    villaType: string;
    propertyDetails: {
        bedrooms: number;
        bathrooms: number;
        indoorArea: number;
        outdoorArea?: number;
        maxOccupancy: number;
        basePrice: number;
    };
    indoorAmenities: string[];
    outdoorFeatures: string[];
    services: string[];
    policies: {
        checkinTime: string;
        checkoutTime: string;
        minStay: number;
        cancellationPolicy: string;
        specialRequirements?: string;
    };
    contact: {
        managerName: string;
        email: string;
        phone: string;
        emergencyPhone?: string;
    };
    images: string[];
    isFeatured?: boolean;
    ownerId?: Types.ObjectId;
}
