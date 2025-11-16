import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUserPublic = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("username email");

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: "Perfil actualizado",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};
