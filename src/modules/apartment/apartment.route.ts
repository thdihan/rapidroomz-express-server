import express from "express";
import { ApartmentController } from "./apartment.controller";

const router = express.Router();

router.post("/create", ApartmentController.createApartment);
router.get("/", ApartmentController.getAllApartments);
router.get("/:id", ApartmentController.getSingleApartment);
router.put("/:id", ApartmentController.updateApartment);
router.patch("/:id/featured", ApartmentController.toggleFeatured);

export const ApartmentRoute = router;
