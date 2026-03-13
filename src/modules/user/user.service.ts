import { IUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = UserModel.create(payload);

    return newUser;
};

const UserService = {
    createUserIntoDB,
};

export default UserService;
