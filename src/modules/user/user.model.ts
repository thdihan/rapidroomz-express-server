import { model, Schema } from "mongoose";
import { EUserRole, IUser } from "./user.interface";

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required."],
            unique: [true, "Email must be unique"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(EUserRole),
            default: EUserRole.guest,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
