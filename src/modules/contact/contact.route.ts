import express from "express";
import { ContactController } from "./contact.controller";

const router = express.Router();

router.post("/", ContactController.createContact);
router.get("/", ContactController.getContacts);
router.patch("/:id", ContactController.updateContactStatus);
router.delete("/:id", ContactController.deleteContact);

export const ContactRoute = router;
