import express from "express";
import { borrowBook, returnBook } from "../controllers/borrowController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/borrow", auth, borrowBook);
router.post("/return", auth, returnBook);

export default router;