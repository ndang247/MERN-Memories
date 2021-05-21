import mongoose from 'mongoose';

// Define a schema for post.
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String], // An array of tags.
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;