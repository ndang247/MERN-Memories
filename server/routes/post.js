import express from 'express';
// Controllers will handle all http api functions request.
import { getPosts, createPost, updatePost } from '../controllers/postsController.js';

const router = express.Router();

// For localhost:8080/posts/ do a get request from controllers.
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;