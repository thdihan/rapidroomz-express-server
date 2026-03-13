import { Request, Response } from "express";
import UserService from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const user = await UserService.createUserIntoDB(req.body);

    res.status(200).json(user);
};

const UserController = {
    createUser,
};
export default UserController;
