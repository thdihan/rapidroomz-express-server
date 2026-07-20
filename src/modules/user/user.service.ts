import { ILoginUser, IUser } from "./user.interface";
import UserModel from "./user.model";
import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = await UserModel.create(payload);
    const userObj = newUser.toObject();
    delete (userObj as any).password;
    return userObj;
};

const loginUserFromDB = async (payload: ILoginUser) => {
    const { email, password } = payload;
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found", "");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password", "");
    }

    const userObj = user.toObject();
    delete (userObj as any).password;
    return userObj;
};

const getOwnersFromDB = async () => {
    const owners = await UserModel.find({ role: "owner" }).select("-password");
    return owners;
};

const getAllUsersFromDB = async () => {
    const users = await UserModel.find().select("-password").sort({ createdAt: -1 });
    return users;
};

const getUserProfileFromDB = async (identifier: string) => {
    let user;
    if (identifier.includes("@")) {
        user = await UserModel.findOne({ email: identifier }).select("-password");
    } else {
        user = await UserModel.findById(identifier).select("-password");
    }

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User profile not found", "");
    }
    return user;
};

const updateUserProfileInDB = async (identifier: string, payload: any) => {
    let user;
    if (identifier.includes("@")) {
        user = await UserModel.findOne({ email: identifier }).select("+password");
    } else {
        user = await UserModel.findById(identifier).select("+password");
    }

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User profile not found", "");
    }

    if (payload.currentPassword && payload.newPassword) {
        const isPasswordMatch = await bcrypt.compare(payload.currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new AppError(httpStatus.BAD_REQUEST, "Current password does not match", "");
        }
        user.password = payload.newPassword;
    }

    if (payload.name) user.name = payload.name;
    if (payload.phone) user.phone = payload.phone;
    if (payload.avatar !== undefined) user.avatar = payload.avatar;
    if (payload.bio !== undefined) user.bio = payload.bio;
    if (payload.address !== undefined) user.address = payload.address;

    await user.save();

    const updatedUser = user.toObject();
    delete (updatedUser as any).password;
    return updatedUser;
};

const UserService = {
    createUserIntoDB,
    loginUserFromDB,
    getOwnersFromDB,
    getAllUsersFromDB,
    getUserProfileFromDB,
    updateUserProfileInDB,
};

export default UserService;
