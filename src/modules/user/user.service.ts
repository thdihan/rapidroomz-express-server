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

const UserService = {
    createUserIntoDB,
    loginUserFromDB,
    getOwnersFromDB,
    getAllUsersFromDB,
};

export default UserService;
