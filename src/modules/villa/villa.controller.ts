import { Request, Response } from "express";
import VillaService from "./villa.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createVilla = catchAsync(async (req: Request, res: Response) => {
    const villa = await VillaService.createVillaIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Villa created successfully.",
        data: villa,
    });
});

const getAllVillas = catchAsync(async (req: Request, res: Response) => {
    const villas = await VillaService.getAllVillasFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Villas retrieved successfully.",
        data: villas,
    });
});

const getSingleVilla = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const villa = await VillaService.getSingleVillaFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Villa retrieved successfully.",
        data: villa,
    });
});

const toggleFeatured = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isFeatured } = req.body;
    const villa = await VillaService.toggleVillaFeaturedIntoDB(id as string, isFeatured);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Villa featured status updated.",
        data: villa,
    });
});

const updateVilla = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const villa = await VillaService.updateVillaIntoDB(id as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Villa updated successfully.",
        data: villa,
    });
});

const VillaController = {
    createVilla,
    updateVilla,
    getAllVillas,
    getSingleVilla,
    toggleFeatured,
};

export default VillaController;
