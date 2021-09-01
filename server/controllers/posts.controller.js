import mongoose from 'mongoose';
import Post from '../models/post.model.js';

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        // Get the starting index of every page.
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Post.countDocuments({});

        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });
    } catch (error) {
        console.log("error");
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await Post.find({
            $or: [
                { title },
                { tags: { $in: tags.split(',') } }
            ]
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString()
    });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// For localhost:8080/posts/123abcxyz the 123abcxyz is the id of the post.
export const updatePost = async (req, res) => {
    const id = req.params.id;

    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post existed with that id: ${id}`);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

// For localhost:8080/posts/123abcxyz the 123abcxyz is the id of the post.
export const deletePost = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post existed with that id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

// For localhost:8080/posts/123abcxyz/likePost the 123abcxyz is the id of the post.
export const likePost = async (req, res) => {
    const id = req.params.id;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post existed with that id: ${id}`);

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) post.likes.push(req.userId);
    else post.likes = post.likes.filter((id) => id !== String(req.userId));

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}