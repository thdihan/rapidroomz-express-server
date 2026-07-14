import { Router } from "express";
import PropertyController from "./property.controller";

const router = Router();

router.post("/create", PropertyController.createProperty);
router.get("/", PropertyController.getAllProperties);

export const PropertyRoute = router;
