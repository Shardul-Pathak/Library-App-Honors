import express from "express";
import {
  createBookController,
  getBooksController,
  updateBookController,
  deleteBookController
} from "../controllers/bookController.js";

import { auth } from "../middlewares/authMiddleware.js";
import { cache } from "../middlewares/cacheMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", auth, upload.single("cover"), createBookController);
router.get("/", cache, getBooksController);
router.put("/:id", auth, updateBookController);
router.delete("/:id", auth, deleteBookController);

export default router;