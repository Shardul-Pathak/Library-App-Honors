import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ENV } from "../config/env.js";

export async function registerUser(data) {
  const { name, email, password } = data;

  const hashed = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashed });
}

export async function loginUser(data) {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET);
  return { token };
}