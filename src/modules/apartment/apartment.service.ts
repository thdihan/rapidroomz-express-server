import { ApartmentInfoModel } from "./apartment.model";
import { IApartmentInfo } from "./apartment.interface";

const createApartmentIntoDB = async (payload: IApartmentInfo) => {
    const result = await ApartmentInfoModel.create(payload);
    return result;
};

const getAllApartmentsFromDB = async (filter: Record<string, any> = {}) => {
    const apartments = await ApartmentInfoModel.find(filter).lean();
    return apartments;
};

const getSingleApartmentFromDB = async (id: string) => {
    const apartmentInfo = await ApartmentInfoModel.findById(id).populate("ownerId", "name email phone role").lean();
    if (!apartmentInfo) {
        throw new Error("Apartment not found");
    }
    return apartmentInfo;
};

const toggleApartmentFeaturedIntoDB = async (id: string, isFeatured: boolean) => {
    const apartment = await ApartmentInfoModel.findByIdAndUpdate(id, { isFeatured }, { new: true });
    if (!apartment) throw new Error("Apartment not found");
    return apartment;
};

const updateApartmentIntoDB = async (id: string, payload: Partial<IApartmentInfo>) => {
    const result = await ApartmentInfoModel.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw new Error("Apartment not found");
    return result;
};

const ApartmentService = {
    createApartmentIntoDB,
    updateApartmentIntoDB,
    getAllApartmentsFromDB,
    getSingleApartmentFromDB,
    toggleApartmentFeaturedIntoDB,
};

export default ApartmentService;
