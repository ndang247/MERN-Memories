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
        //console.log(newPost);
        res.status(201).json(newPost);
        
    } catch (err) {
        //console.log(err.message);
        res.status(409).json({message: err.message});
    }
}