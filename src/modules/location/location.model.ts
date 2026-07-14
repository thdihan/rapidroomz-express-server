import { model, Schema } from "mongoose";
import { ICountry, IState, ICity } from "./location.interface";

const CountrySchema = new Schema<ICountry>(
    {
        name: { type: String, required: true, unique: true },
        code: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const StateSchema = new Schema<IState>(
    {
        name: { type: String, required: true },
        countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    },
    { timestamps: true }
);

const CitySchema = new Schema<ICity>(
    {
        name: { type: String, required: true },
        stateId: { type: Schema.Types.ObjectId, ref: "State" }, // Optional
        countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    },
    { timestamps: true }
);

export const CountryModel = model<ICountry>("Country", CountrySchema);
export const StateModel = model<IState>("State", StateSchema);
export const CityModel = model<ICity>("City", CitySchema);
