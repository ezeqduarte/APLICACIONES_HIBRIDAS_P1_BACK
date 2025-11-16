import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import {
  getUserPublic,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = Router();

router.get("/:id", getUserPublic); 
router.get("/profile/me", authRequired, getProfile); 
router.put("/profile/me", authRequired, updateProfile);

export default router;