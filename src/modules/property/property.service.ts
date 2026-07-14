import { IProperty } from "./property.interface";
import PropertyModel from "./property.model";

const createPropertyIntoDB = async (payload: IProperty) => {
    const newProperty = await PropertyModel.create(payload);
    return newProperty;
};

const getAllPropertiesFromDB = async (filter: Record<string, any> = {}) => {
    // Basic filter processing, for example filtering by ownerId if provided
    const properties = await PropertyModel.find(filter).populate("ownerId", "name email");
    return properties;
};

const PropertyService = {
    createPropertyIntoDB,
    getAllPropertiesFromDB,
};

export default PropertyService;
