import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  issuedAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returned: { type: Boolean, default: false }
});

export const Borrow = mongoose.model("Borrow", borrowSchema);