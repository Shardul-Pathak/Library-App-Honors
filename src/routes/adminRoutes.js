import express from "express";
import {
  importBooks,
  fetchAndStore,
  exportBooks
} from "../controllers/adminController.js";

import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/import", auth, importBooks);
router.post("/fetch", auth, fetchAndStore);
router.get("/export", auth, exportBooks);

export default router;