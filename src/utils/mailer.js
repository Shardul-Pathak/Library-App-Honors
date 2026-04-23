import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL,
    pass: ENV.EMAIL_PASS
  }
});