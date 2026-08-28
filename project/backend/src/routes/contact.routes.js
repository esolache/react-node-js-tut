import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = Router();

// POST /api/contact — matches the fetch() call in frontend/src/pages/Contact.jsx
router.post("/", submitContactForm);

export default router;
