import express from "express";
import { ResortController } from "./resort.controller";

const router = express.Router();

router.post("/create", ResortController.createResort);
router.get("/", ResortController.getAllResorts);
router.get("/:id", ResortController.getSingleResort);
router.put("/:id", ResortController.updateResort);
router.patch("/:id/featured", ResortController.toggleFeatured);

export const ResortRoute = router;
