import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        // Since find() is an async function add an await and make the function getPosts async.
        const postMessages = await PostMessage.find();

        // For inspection and debugging purpose do a console.log().
        //console.log(PostMessages);

        res.status(200).json(postMessages);

    } catch (error) {
        //console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        // Asynchronously save new post to the db.
        await newPostMessage.save();

        // For inspection and debugging purpose do a console.log().
        //console.log(req.body);
        //console.log(newPost);

        res.status(201).json(newPostMessage);

    } catch (error) {
        //console.log(error);
        res.status(409).json({ message: error.message });
    }
}

// For localhost:8080/posts/123abcxyz the 123abcxyz is the id of the post.
export const updatePost = async (req, res) => {
    // Extracting the id from the req params.
    const id = req.params.id;

    const post = req.body;

    // For inspection and debugging purpose do a console.log().
    //console.log(req.params);

    // Check if _id is a valid mongoose object id (i.e. the object existed if true).
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post existed with that id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

// For localhost:8080/posts/123abcxyz the 123abcxyz is the id of the post.
export const deletePost = async (req, res) => {
    const id = req.params.id;

    // Check if _id is a valid mongoose object id (i.e. the object existed if true).
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post existed with that id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

// For localhost:8080/posts/123abcxyz/likePost the 123abcxyz is the id of the post.
export const likePost = async (req, res) => {
    const id = req.params.id;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    // Check if _id is a valid mongoose object id (i.e. the object existed if true).
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post existed with that id: ${id}`);

    // Find the existing post by id.
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // Then update the like count of this post.
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}