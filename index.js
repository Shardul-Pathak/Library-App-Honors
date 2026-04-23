import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/config/env.js";

import authRoutes from "./src/routes/authRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import borrowRoutes from "./src/routes/borrowRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

import { limiter } from "./src/middlewares/rateLimiter.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(limiter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);
app.use("/files", fileRoutes);
app.use("/notifications", notificationRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Library Management System API Running" });
});

app.use(errorHandler);

await connectDB();

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});