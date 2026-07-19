import { Request, Response } from "express";
import SettingService from "./setting.service";

const getSetting = async (req: Request, res: Response) => {
    try {
        const { key } = req.params as { key: string };
        let result = await SettingService.getSettingFromDB(key);
        
        // If not found, return a default for known keys
        if (!result && key === "about_us") {
            result = {
                key: "about_us",
                value: "RapidRoomz is a modern property booking platform designed to connect hotel, resort, villa, and apartment owners with guests globally. We focus on providing seamless stay bookings, high-fidelity user experiences, and premium customer service."
            } as any;
        }

        res.status(200).json({
            success: true,
            message: "Setting fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateSetting = async (req: Request, res: Response) => {
    try {
        const { key } = req.params as { key: string };
        const { value } = req.body;
        
        if (value === undefined) {
            return res.status(400).json({ success: false, message: "Value is required" });
        }

        const result = await SettingService.updateSettingInDB(key, value);
        res.status(200).json({
            success: true,
            message: "Setting updated successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const SettingController = {
    getSetting,
    updateSetting,
};
