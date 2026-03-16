import { IUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = UserModel.create(payload);

    console.log("Create User services called");

    return newUser;
};

const UserService = {
    createUserIntoDB,
};

export default UserService;
