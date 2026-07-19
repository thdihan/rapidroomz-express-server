import express from "express";
import { SettingController } from "./setting.controller";

const router = express.Router();

router.get("/:key", SettingController.getSetting);
router.put("/:key", SettingController.updateSetting);

export const SettingRoute = router;
