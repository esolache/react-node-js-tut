import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.js";

const router = Router();

// POST /api/bookings — TODO: wire up to the Book Online page's future form.
router.post("/", createBooking);

export default router;
