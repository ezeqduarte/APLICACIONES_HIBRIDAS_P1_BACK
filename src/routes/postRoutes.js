import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { createPost, getPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authRequired, createPost);

export default router;
