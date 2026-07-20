import { Router } from "express";
import UserController from "./user.controller";

const router = Router();

router.post("/create", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/owners", UserController.getOwners);
router.get("/profile", UserController.getUserProfile);
router.get("/profile/:id", UserController.getUserProfile);
router.patch("/profile/:id", UserController.updateUserProfile);
router.patch("/profile", UserController.updateUserProfile);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserProfile);
router.patch("/:id", UserController.updateUserProfile);

export const UserRoute = router;
