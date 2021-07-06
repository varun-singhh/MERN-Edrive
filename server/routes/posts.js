import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  DeletePost,
  getTrash,
  restore,
  Likes,
  unstar,
  RemovePost,
  starred,
} from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.get('/', auth, getPosts);
router.get('/trash', auth, getTrash);
router.get('/starred', auth, starred);
router.post('/unstar/:id', auth, unstar);
router.post('/create', auth, createPost);
router.post('/update/:id', auth, updatePost);
router.post('/restore/:id', auth, restore);
router.put('/star/:id', auth, Likes);
router.delete('/:id', auth, DeletePost);
router.delete('/remove/:id', auth, RemovePost);
export default router;
