import ContactModel from "./contact.model";
import { IContact } from "./contact.interface";

const createContactInDB = async (payload: Partial<IContact>) => {
    return await ContactModel.create(payload);
};

const getContactsFromDB = async () => {
    return await ContactModel.find().sort({ createdAt: -1 }).lean();
};

const updateContactStatusInDB = async (id: string, status: string) => {
    return await ContactModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    ).lean();
};

const deleteContactFromDB = async (id: string) => {
    return await ContactModel.findByIdAndDelete(id).lean();
};

const ContactService = {
    createContactInDB,
    getContactsFromDB,
    updateContactStatusInDB,
    deleteContactFromDB,
};

export default ContactService;
