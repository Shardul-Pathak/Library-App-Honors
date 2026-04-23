import mongoose from "mongoose";

const cacheSchema = new mongoose.Schema({
  key: String,
  value: String,
  expiresAt: Date
});

export const Cache = mongoose.model("Cache", cacheSchema);