import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { createPost, updatePost, deletePost, getPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authRequired, createPost);
router.put("/:id", authRequired, updatePost);
router.delete("/:id", authRequired, deletePost);

export default router;
