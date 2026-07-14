import { Request, Response } from "express";
import HotelService from "./hotel.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createHotel = catchAsync(async (req: Request, res: Response) => {
    const hotel = await HotelService.createHotelIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Hotel created successfully.",
        data: hotel,
    });
});

const getAllHotels = catchAsync(async (req: Request, res: Response) => {
    const hotels = await HotelService.getAllHotelsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hotels retrieved successfully.",
        data: hotels,
    });
});

const getSingleHotel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const hotel = await HotelService.getSingleHotelFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hotel retrieved successfully.",
        data: hotel,
    });
});

const toggleFeatured = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isFeatured } = req.body;
    const hotel = await HotelService.toggleHotelFeaturedIntoDB(id as string, isFeatured);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hotel featured status updated.",
        data: hotel,
    });
});

const updateHotel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const hotel = await HotelService.updateHotelIntoDB(id as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hotel updated successfully.",
        data: hotel,
    });
});

const HotelController = {
    createHotel,
    updateHotel,
    getAllHotels,
    getSingleHotel,
    toggleFeatured,
};
export default HotelController;
