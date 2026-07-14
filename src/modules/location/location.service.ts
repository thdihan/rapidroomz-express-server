import { CountryModel, StateModel, CityModel } from "./location.model";

const getCountriesFromDB = async () => {
    return await CountryModel.find().sort({ name: 1 }).lean();
};

const getStatesByCountryFromDB = async (countryId: string) => {
    return await StateModel.find({ countryId }).sort({ name: 1 }).lean();
};

const getCitiesFromDB = async (countryId: string, stateId?: string) => {
    const filter: any = { countryId };
    if (stateId) {
        filter.stateId = stateId;
    }
    return await CityModel.find(filter).sort({ name: 1 }).lean();
};

const seedLocationsIntoDB = async () => {
    // Clear existing data
    await CountryModel.deleteMany({});
    await StateModel.deleteMany({});
    await CityModel.deleteMany({});

    // Seed USA
    const usa = await CountryModel.create({ name: "United States", code: "US" });
    const ca = await StateModel.create({ name: "California", countryId: usa._id });
    const ny = await StateModel.create({ name: "New York", countryId: usa._id });
    const tx = await StateModel.create({ name: "Texas", countryId: usa._id });

    await CityModel.insertMany([
        { name: "Los Angeles", stateId: ca._id, countryId: usa._id },
        { name: "San Francisco", stateId: ca._id, countryId: usa._id },
        { name: "New York City", stateId: ny._id, countryId: usa._id },
        { name: "Buffalo", stateId: ny._id, countryId: usa._id },
        { name: "Austin", stateId: tx._id, countryId: usa._id },
        { name: "Houston", stateId: tx._id, countryId: usa._id },
    ]);

    // Seed Bangladesh
    const bd = await CountryModel.create({ name: "Bangladesh", code: "BD" });

    // Bangladesh has no states in this implementation
    await CityModel.insertMany([
        { name: "Dhaka", countryId: bd._id },
        { name: "Chittagong", countryId: bd._id },
        { name: "Sylhet", countryId: bd._id },
        { name: "Rajshahi", countryId: bd._id },
    ]);

    return { message: "Locations seeded successfully" };
};

const LocationService = {
    getCountriesFromDB,
    getStatesByCountryFromDB,
    getCitiesFromDB,
    seedLocationsIntoDB,
};

export default LocationService;
