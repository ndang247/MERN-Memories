import express from 'express';
import {
    getPostsBySearch, getPosts, createPost, updatePost,
    deletePost, likePost, getPost
} from '../controllers/posts.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Don't put router.get('/:id', getPost); first as it will execute first before search.
// Hence search will not execute when doing searching.
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;