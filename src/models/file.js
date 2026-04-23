import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now }
});

export const File = mongoose.model("File", fileSchema);