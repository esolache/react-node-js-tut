import { Router } from "express";
import contactRoutes from "./contact.routes.js";
import bookingRoutes from "./booking.routes.js";
import todoTutorialRoutes from "./todo-tutorial.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/contact", contactRoutes);
router.use("/bookings", bookingRoutes);
router.use("/todo-tutorial", todoTutorialRoutes);

export default router;
