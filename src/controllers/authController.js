import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { token } = await loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({ message: "Logged in" });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}