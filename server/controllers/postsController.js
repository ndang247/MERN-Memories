import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        // Since find() is an async function add an await and make the function getPosts async.
        const postMessages = await postMessage.find();

        // For inspection and debugging purpose do a console.log().
        //console.log(postMessages);

        res.status(200).json(postMessages);

    } catch (err) {
        //console.log(err.message);
        res.status(404).json({message: err.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage(post);

    try {
        // Asynchronously save new post to the db.
        await newPost.save();

        // For inspection and debugging purpose do a console.log().
        //console.log(req.body);
        //console.log(newPost);

        res.status(201).json(newPost);
        
    } catch (err) {
        //console.log(err.message);
        res.status(409).json({message: err.message});
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

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);

}