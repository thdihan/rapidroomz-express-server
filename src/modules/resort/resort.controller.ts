import { Request, Response } from "express";
import ResortService from "./resort.service";

const createResort = async (req: Request, res: Response) => {
    try {
        const result = await ResortService.createResortIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: "Resort property created successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to create resort property",
            errorSources: err.errors
                ? Object.values(err.errors).map((e: any) => ({
                      path: e.path,
                      message: e.message,
                  }))
                : [],
        });
    }
};

const getAllResorts = async (req: Request, res: Response) => {
    try {
        const result = await ResortService.getAllResortsFromDB(req.query);
        res.status(200).json({
            success: true,
            message: "Resorts fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch resorts",
        });
    }
};

const getSingleResort = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await ResortService.getSingleResortFromDB(id as string);
        res.status(200).json({
            success: true,
            message: "Resort fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch resort details",
        });
    }
};

const toggleFeatured = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isFeatured } = req.body;
        const result = await ResortService.toggleResortFeaturedIntoDB(id as string, isFeatured);
        res.status(200).json({
            success: true,
            message: "Resort featured status updated",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to update featured status",
        });
    }
};

const updateResort = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await ResortService.updateResortIntoDB(id as string, req.body);
        res.status(200).json({
            success: true,
            message: "Resort updated successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to update resort",
        });
    }
};

export const ResortController = {
    createResort,
    updateResort,
    getAllResorts,
    getSingleResort,
    toggleFeatured,
};
