import express from "express";
import { LocationController } from "./location.controller";

const router = express.Router();

router.get("/countries", LocationController.getCountries);
router.get("/states", LocationController.getStates);
router.get("/cities", LocationController.getCities);
router.post("/seed", LocationController.seedLocations);

export const LocationRoute = router;
