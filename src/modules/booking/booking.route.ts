import express from "express";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post("/", BookingController.createBooking);
router.get("/all", BookingController.getAllBookings);
router.get("/my-bookings/:userId", BookingController.getUserBookings);
router.get("/owner-bookings/:ownerId", BookingController.getOwnerBookings);
router.get("/availability/:propertyId", BookingController.getPropertyAvailability);
router.patch("/:bookingId/status", BookingController.updateBookingStatus);

export const BookingRoute = router;
