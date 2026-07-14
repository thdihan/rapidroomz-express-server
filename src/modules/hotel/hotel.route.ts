import { Router } from "express";
import HotelController from "./hotel.controller";

const router = Router();

router.post("/create", HotelController.createHotel);
router.get("/", HotelController.getAllHotels);
router.get("/:id", HotelController.getSingleHotel);
router.put("/:id", HotelController.updateHotel);
router.patch("/:id/featured", HotelController.toggleFeatured);

export const HotelRoute = router;
