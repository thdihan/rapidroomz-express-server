import { Request, Response } from "express";
import UserService from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully.",
        data: user,
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.loginUserFromDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully.",
        data: user,
    });
});

const getOwners = catchAsync(async (req: Request, res: Response) => {
    const owners = await UserService.getOwnersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Owners retrieved successfully.",
        data: owners,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully.",
        data: users,
    });
});

const UserController = {
    createUser,
    loginUser,
    getOwners,
    getAllUsers,
};
export default UserController;
