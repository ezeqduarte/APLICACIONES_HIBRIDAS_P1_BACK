import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = await Post.create({
      title,
      content,
      createdBy: req.user._id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "-password");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "-password");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await post.deleteOne();
    res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar post" });
  }
};

