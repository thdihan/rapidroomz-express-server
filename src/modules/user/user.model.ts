import { model, Schema } from "mongoose";
import { EUserRole, IUser } from "./user.interface";
import bcrypt from "bcrypt";

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
            select: false,
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

UserSchema.pre("save", async function () {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }
});

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
