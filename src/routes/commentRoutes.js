import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { createComment, getCommentsByPost, deleteComment, getCommentCountByUser } from "../controllers/commentController.js";

const router = Router();

router.post("/", authRequired, createComment);
router.get("/:postId", getCommentsByPost);
router.get("/user/:id/count", getCommentCountByUser);
router.delete("/:id", authRequired, deleteComment);

export default router;