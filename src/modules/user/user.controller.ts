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

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const identifier = (req.params.id as string) || (req.query.email as string) || (req.query.id as string);
    const user = await UserService.getUserProfileFromDB(identifier);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile retrieved successfully.",
        data: user,
    });
});

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
    const identifier = (req.params.id as string) || (req.body.id as string) || (req.body.email as string);
    const updatedUser = await UserService.updateUserProfileInDB(identifier, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully.",
        data: updatedUser,
    });
});

const UserController = {
    createUser,
    loginUser,
    getOwners,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
};
export default UserController;
