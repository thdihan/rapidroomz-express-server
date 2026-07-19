import SettingModel from "./setting.model";

const getSettingFromDB = async (key: string) => {
    return await SettingModel.findOne({ key }).lean();
};

const updateSettingInDB = async (key: string, value: string) => {
    return await SettingModel.findOneAndUpdate(
        { key },
        { value },
        { new: true, upsert: true }
    ).lean();
};

const SettingService = {
    getSettingFromDB,
    updateSettingInDB,
};

export default SettingService;
