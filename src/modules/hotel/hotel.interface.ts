import { Document, Types } from "mongoose";

export interface IHotelInfo extends Document {
    name: string;
    starRating: number;
    address: {
        country: string;
        state?: string;
        city: string;
        addressLine: string;
    };
    description: string;
    currencies: string[];
    policies: {
        checkinTime: string;
        checkoutTime: string;
        cancellationPolicy: string;
        paymentMethods: string[];
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

export interface IHotelRoom extends Document {
    hotelId: Types.ObjectId;
    roomType: string;
    name?: string;
    capacity: number;
    count: number;
    publishedRate: number;
    agencyRate: number;
    images: string[];
}

export interface IHotelAmenity extends Document {
    hotelId: Types.ObjectId;
    name: string;
    isEnabled: boolean;
}
