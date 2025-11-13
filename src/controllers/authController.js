import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ¿ya existe el usuario?
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "El email ya está registrado" });

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // crear usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verificar si existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Credenciales incorrectas" });

    // verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Credenciales incorrectas" });

    // sin token por ahora, solo confirmamos
    res.json({
      message: "Login correcto",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
