import { Document } from "mongoose";

export interface ISetting extends Document {
    key: string;
    value: string;
}
