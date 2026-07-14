import { Router } from "express";
import VillaController from "./villa.controller";

const router = Router();

router.post("/create", VillaController.createVilla);
router.get("/", VillaController.getAllVillas);
router.get("/:id", VillaController.getSingleVilla);
router.put("/:id", VillaController.updateVilla);
router.patch("/:id/featured", VillaController.toggleFeatured);

export const VillaRoute = router;
