import { Notification } from "../models/Notification.js";

export async function getNotifications(req, res, next) {
  try {
    const data = await Notification.find({ user: req.user.id });
    res.json(data);
  } catch (err) {
    next(err);
  }
}