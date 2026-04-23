import { transporter } from "../utils/mailer.js";

export function sendEmail(to, subject, text) {
  return transporter.sendMail({ to, subject, text });
}