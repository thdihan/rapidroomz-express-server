import { model, Schema } from "mongoose";
import { ISetting } from "./setting.interface";

const SettingSchema = new Schema<ISetting>(
    {
        key: {
            type: String,
            required: [true, "Key is required."],
            unique: true,
            trim: true,
        },
        value: {
            type: String,
            required: [true, "Value is required."],
        },
    },
    {
        timestamps: true,
    }
);

const SettingModel = model<ISetting>("Setting", SettingSchema);
export default SettingModel;
