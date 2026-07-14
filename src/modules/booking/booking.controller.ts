import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    // Expect userId in the body payload
    const bookingData = req.body;
    
    const result = await BookingService.createBooking(bookingData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: result,
    });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await BookingService.getUserBookings(userId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,
    });
});

const getOwnerBookings = catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.params.ownerId;
    const result = await BookingService.getOwnerBookings(ownerId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Owner bookings retrieved successfully",
        data: result,
    });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId;
    const { status, paymentStatus } = req.body;
    
    const result = await BookingService.updateBookingStatus(bookingId as string, { status, paymentStatus });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking updated successfully",
        data: result,
    });
});

const getPropertyAvailability = catchAsync(async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
        throw new Error("Missing required query parameters: checkIn and checkOut.");
    }

    const result = await BookingService.getPropertyAvailability(propertyId as string, checkIn as string, checkOut as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Property availability retrieved successfully",
        data: result,
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.getAllBookings();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All bookings retrieved successfully",
        data: result,
    });
});

export const BookingController = {
    createBooking,
    getUserBookings,
    getOwnerBookings,
    getAllBookings,
    updateBookingStatus,
    getPropertyAvailability,
};
