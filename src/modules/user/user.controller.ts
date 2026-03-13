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

const UserController = {
    createUser,
};
export default UserController;
