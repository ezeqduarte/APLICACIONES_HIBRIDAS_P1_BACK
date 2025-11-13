import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function authRequired(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No autorizado. Token faltante" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
}