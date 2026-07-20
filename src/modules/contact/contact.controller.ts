import { Request, Response } from "express";
import ContactService from "./contact.service";

const createContact = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields (name, email, subject, message).",
            });
        }

        const result = await ContactService.createContactInDB({
            name,
            email,
            phone: phone || "",
            subject,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Your message has been sent successfully. We will get back to you soon!",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getContacts = async (req: Request, res: Response) => {
    try {
        const result = await ContactService.getContactsFromDB();
        res.status(200).json({
            success: true,
            message: "Contact messages fetched successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateContactStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const { status } = req.body;

        if (!status || !["unread", "read", "replied"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Valid status ('unread', 'read', 'replied') is required.",
            });
        }

        const result = await ContactService.updateContactStatusInDB(id, status);
        res.status(200).json({
            success: true,
            message: "Contact status updated successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const result = await ContactService.deleteContactFromDB(id);
        res.status(200).json({
            success: true,
            message: "Contact message deleted successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const ContactController = {
    createContact,
    getContacts,
    updateContactStatus,
    deleteContact,
};
