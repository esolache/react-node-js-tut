import { Router } from "express";
import { submitContactForm, getContactForms, getContactFormNotes, postContactFormNotes } from "../controllers/contact.controller.js";

const router = Router();

// POST /api/contact — matches the fetch() call in frontend/src/pages/Contact.jsx
router.post("/", submitContactForm);
router.get("/", getContactForms);
router.get("/:id/notes", getContactFormNotes);
router.post("/:id/notes", postContactFormNotes);


export default router;
