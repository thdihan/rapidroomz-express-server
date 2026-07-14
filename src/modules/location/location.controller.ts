import { Request, Response } from "express";
import LocationService from "./location.service";

const getCountries = async (req: Request, res: Response) => {
    try {
        const result = await LocationService.getCountriesFromDB();
        res.status(200).json({
            success: true,
            message: "Countries fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getStates = async (req: Request, res: Response) => {
    try {
        const { countryId } = req.query;
        if (!countryId) {
            return res.status(400).json({ success: false, message: "countryId is required" });
        }
        const result = await LocationService.getStatesByCountryFromDB(countryId as string);
        res.status(200).json({
            success: true,
            message: "States fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getCities = async (req: Request, res: Response) => {
    try {
        const { countryId, stateId } = req.query;
        if (!countryId) {
            return res.status(400).json({ success: false, message: "countryId is required" });
        }
        const result = await LocationService.getCitiesFromDB(countryId as string, stateId as string);
        res.status(200).json({
            success: true,
            message: "Cities fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const seedLocations = async (req: Request, res: Response) => {
    try {
        const result = await LocationService.seedLocationsIntoDB();
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const LocationController = {
    getCountries,
    getStates,
    getCities,
    seedLocations,
};
