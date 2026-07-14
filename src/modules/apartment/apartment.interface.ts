import { Document, Types } from "mongoose";

export interface IApartmentInfo extends Document {
    propertyName: string;
    address: {
        country: string;
        state?: string;
        city: string;
        addressLine: string;
    };
    description: string;
    apartmentType: string;
    propertyDetails: {
        bedrooms: number;
        bathrooms: number;
        floorArea: number;
        floorLevel: number;
        maxOccupancy: number;
        basePrice: number;
    };
    amenities: string[];
    buildingFeatures: string[];
    policies: {
        checkinTime: string;
        checkoutTime: string;
        minStay: number;
        cancellationPolicy: string;
        houseRules?: string;
    };
    contact: {
        contactName: string;
        email: string;
        phone: string;
        altPhone?: string;
    };
    images: string[];
    isFeatured?: boolean;
    ownerId?: Types.ObjectId;
}
