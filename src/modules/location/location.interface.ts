import { Document, Types } from "mongoose";

export interface ICountry extends Document {
    name: string;
    code: string;
}

export interface IState extends Document {
    name: string;
    countryId: Types.ObjectId;
}

export interface ICity extends Document {
    name: string;
    stateId?: Types.ObjectId;
    countryId: Types.ObjectId;
}
