import express from 'express';
// Controllers will handle all http api functions request.
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postsController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// For localhost:8080/posts/ do a get request from controllers.
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;