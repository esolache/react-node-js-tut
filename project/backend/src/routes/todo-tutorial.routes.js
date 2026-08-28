import { Router } from "express";
import { getTodos, postTodo, putTodo, deleteTodo  } from "../controllers/todo-tutorial.controller.js";

const router = Router();

// POST /api/bookings — TODO: wire up to the Book Online page's future form.
router.get("/", getTodos);
router.post("/", postTodo);
router.put("/:id", putTodo);
router.delete("/:id", deleteTodo);

export default router;
