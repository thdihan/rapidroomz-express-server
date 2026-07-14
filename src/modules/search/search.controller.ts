import { Request, Response } from "express";
import { SearchService } from "./search.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const searchProperties = catchAsync(async (req: Request, res: Response) => {
    const { checkIn, checkOut, guests, location, type } = req.query;

    if (!checkIn || !checkOut || !guests) {
        throw new Error("Missing required search parameters: checkIn, checkOut, and guests.");
    }

    const searchParams = {
        checkIn: checkIn as string,
        checkOut: checkOut as string,
        guests: parseInt(guests as string, 10),
        location: location ? location as string : undefined,
        type: type ? type as string : undefined
    };

    const results = await SearchService.searchProperties(searchParams);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Search completed successfully",
        data: results,
    });
});

export const SearchController = {
    searchProperties,
};
