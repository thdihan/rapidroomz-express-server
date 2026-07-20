import { model, Schema } from "mongoose";
import { IContact } from "./contact.interface";

const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            trim: true,
        },
        phone: {
            type: String,
            default: "",
            trim: true,
        },
        subject: {
            type: String,
            required: [true, "Subject is required."],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required."],
            trim: true,
        },
        status: {
            type: String,
            enum: ["unread", "read", "replied"],
            default: "unread",
        },
    },
    {
        timestamps: true,
    }
);

const ContactModel = model<IContact>("Contact", ContactSchema);
export default ContactModel;
