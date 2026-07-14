import { ResortInfoModel } from "./resort.model";
import { IResortInfo } from "./resort.interface";

const createResortIntoDB = async (payload: IResortInfo) => {
    const result = await ResortInfoModel.create(payload);
    return result;
};

const getAllResortsFromDB = async (filter: Record<string, any> = {}) => {
    const resorts = await ResortInfoModel.find(filter).lean();
    return resorts;
};

const getSingleResortFromDB = async (id: string) => {
    const resortInfo = await ResortInfoModel.findById(id).populate("ownerId", "name email phone role").lean();
    if (!resortInfo) {
        throw new Error("Resort not found");
    }
    return resortInfo;
};

const toggleResortFeaturedIntoDB = async (id: string, isFeatured: boolean) => {
    const resort = await ResortInfoModel.findByIdAndUpdate(id, { isFeatured }, { new: true });
    if (!resort) throw new Error("Resort not found");
    return resort;
};

const updateResortIntoDB = async (id: string, payload: Partial<IResortInfo>) => {
    const result = await ResortInfoModel.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw new Error("Resort not found");
    return result;
};

const ResortService = {
    createResortIntoDB,
    updateResortIntoDB,
    getAllResortsFromDB,
    getSingleResortFromDB,
    toggleResortFeaturedIntoDB,
};

export default ResortService;
