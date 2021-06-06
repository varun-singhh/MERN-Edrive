import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/post.js';
const router = express.Router();
router.get('/', getPosts);
router.post('/create', createPost);
router.post('/update/:id', createPost);
export default router;
