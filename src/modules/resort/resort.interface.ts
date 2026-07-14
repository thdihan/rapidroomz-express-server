import { Document, Types } from "mongoose";

export interface IResortInfo extends Document {
    propertyName: string;
    address: {
        country: string;
        state?: string;
        city: string;
        addressLine: string;
    };
    description: string;
    starRating: number;
    roomTypes: {
        roomType: string;
        count: number;
        occupancy: number;
        size: number;
        price: number;
        images?: string[];
    }[];
    features: string[];
    activities: string[];
    policies: {
        checkinTime: string;
        checkoutTime: string;
        minStay: number;
        cancellationPolicy: string;
    };
    contact: {
        contactName: string;
        email: string;
        phone: string;
        website?: string;
    };
    images: string[];
    isFeatured?: boolean;
    ownerId?: Types.ObjectId;
}
