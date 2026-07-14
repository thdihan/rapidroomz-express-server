import { Request, Response } from "express";
import ApartmentService from "./apartment.service";

const createApartment = async (req: Request, res: Response) => {
    try {
        const result = await ApartmentService.createApartmentIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: "Apartment property created successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to create apartment property",
            errorSources: err.errors
                ? Object.values(err.errors).map((e: any) => ({
                      path: e.path,
                      message: e.message,
                  }))
                : [],
        });
    }
};

const getAllApartments = async (req: Request, res: Response) => {
    try {
        const result = await ApartmentService.getAllApartmentsFromDB(req.query);
        res.status(200).json({
            success: true,
            message: "Apartments fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch apartments",
        });
    }
};

const getSingleApartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await ApartmentService.getSingleApartmentFromDB(id as string);
        res.status(200).json({
            success: true,
            message: "Apartment fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch apartment details",
        });
    }
};

const toggleFeatured = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isFeatured } = req.body;
        const apartment = await ApartmentService.toggleApartmentFeaturedIntoDB(id as string, isFeatured);

        res.status(200).json({
            success: true,
            message: "Apartment featured status updated.",
            data: apartment,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to update featured status",
        });
    }
};

export const updateApartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const apartment = await ApartmentService.updateApartmentIntoDB(id as string, req.body);
        res.status(200).json({
            success: true,
            message: "Apartment updated successfully.",
            data: apartment,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to update apartment",
        });
    }
};

export const ApartmentController = {
    createApartment,
    updateApartment,
    getAllApartments,
    getSingleApartment,
    toggleFeatured,
};
