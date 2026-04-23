import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}