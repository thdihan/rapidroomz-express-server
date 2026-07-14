import { Request, Response } from "express";
import PropertyService from "./property.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProperty = catchAsync(async (req: Request, res: Response) => {
    const property = await PropertyService.createPropertyIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Property created successfully.",
        data: property,
    });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
    // Extract optional filters from query string, e.g. ownerId
    const filter: Record<string, any> = {};
    if (req.query.ownerId) {
        filter.ownerId = req.query.ownerId;
    }
    if (req.query.type) {
        filter.type = req.query.type;
    }

    const properties = await PropertyService.getAllPropertiesFromDB(filter);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Properties retrieved successfully.",
        data: properties,
    });
});

const PropertyController = {
    createProperty,
    getAllProperties,
};
export default PropertyController;
