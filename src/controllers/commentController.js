import { Comment } from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    const comment = await Comment.create({
      content,
      postId,
      createdBy: req.user._id,
    });

    res.status(201).json(await comment.populate("createdBy", "username email"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear comentario" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

    if (comment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await comment.deleteOne();

    res.json({ message: "Comentario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar comentario" });
  }
};


export const getCommentCountByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const count = await Comment.countDocuments({ createdBy: userId });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error al contar comentarios" });
  }
};

