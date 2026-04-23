import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  available: { type: Boolean, default: true },
  cover: { type: String },
  file: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Book = mongoose.model("Book", bookSchema);