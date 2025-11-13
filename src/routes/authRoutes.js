import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authRequired, (req, res) => {
  res.json({
    message: "Ruta protegida OK",
    user: req.user
  });
});

export default router;