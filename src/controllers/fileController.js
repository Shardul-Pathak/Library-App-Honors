import { File } from "../models/File.js";

export async function uploadFile(req, res, next) {
  try {
    const file = await File.create(req.file);
    res.json(file);
  } catch (err) {
    next(err);
  }
}