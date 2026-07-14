import { VillaInfoModel } from "./villa.model";
import { IVillaInfo } from "./villa.interface";

const createVillaIntoDB = async (payload: IVillaInfo) => {
    const result = await VillaInfoModel.create(payload);
    return result;
};

const getAllVillasFromDB = async (filter: Record<string, any> = {}) => {
    const villas = await VillaInfoModel.find(filter).lean();
    return villas;
};

const getSingleVillaFromDB = async (id: string) => {
    const villaInfo = await VillaInfoModel.findById(id).populate("ownerId", "name email phone role").lean();
    if (!villaInfo) {
        throw new Error("Villa not found");
    }
    return villaInfo;
};

const toggleVillaFeaturedIntoDB = async (id: string, isFeatured: boolean) => {
    const villa = await VillaInfoModel.findByIdAndUpdate(id, { isFeatured }, { new: true });
    if (!villa) throw new Error("Villa not found");
    return villa;
};

const updateVillaIntoDB = async (id: string, payload: Partial<IVillaInfo>) => {
    const result = await VillaInfoModel.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw new Error("Villa not found");
    return result;
};

const VillaService = {
    createVillaIntoDB,
    updateVillaIntoDB,
    getAllVillasFromDB,
    getSingleVillaFromDB,
    toggleVillaFeaturedIntoDB,
};

export default VillaService;
