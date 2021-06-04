import express from 'express';
// Controllers will handle all http api functions request.
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postsController.js';

const router = express.Router();

// For localhost:8080/posts/ do a get request from controllers.
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;