import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch {}
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No Post with that ID');
  const post = req.body;

  const UpdatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(UpdatedPost);
};
