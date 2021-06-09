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
const router = express.Router();
router.get('/', getPosts);
router.get('/trash', getTrash);
router.get('/starred', starred);
router.post('/unstar/:id', unstar);
router.post('/create', createPost);
router.post('/update/:id', createPost);
router.post('/restore/:id', restore);
router.put('/likes/:id', Likes);
router.delete('/:id', DeletePost);
router.delete('/remove/:id', RemovePost);
export default router;
