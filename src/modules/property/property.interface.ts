import { Document, Types } from "mongoose";

export enum EPropertyType {
    hotel = "hotel",
    resort = "resort",
    villa = "villa",
    apartment = "apartment",
}

export interface IProperty extends Document {
    name: string;
    type: EPropertyType;
    location: string;
    pricePerNight: number;
    description?: string;
    ownerId?: Types.ObjectId;
    images?: string[];
}
