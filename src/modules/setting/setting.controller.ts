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
        } else if (!result && key === "contact_info") {
            result = {
                key: "contact_info",
                value: JSON.stringify({
                    email: "hello@rapidroomz.com",
                    phone: "+1 (555) 123-4567",
                    address: "123 Booking Street, Travel City, NY 10001",
                    workingHours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
                    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2543635164!2d-74.11976373946229!3d40.69767006338158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s",
                }),
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
