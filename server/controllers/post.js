import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import TrashMessage from '../models/TrashMessage.js';
import StarredMessage from '../models/StarredMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = { ...req.body, createdAt: new Date() };
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch {
    res.status(404).json({ message: error.message });
  }
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
export const DeletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'Invalid' });
  const post = await PostMessage.findById(_id);
  if (post === null) return res.status(404).json({ message: 'Id Not Found' });
  const newTrash = {
    title: post.title,
    message: post.message,
    creator: post.creator,
    tags: post.tags,
    selectedFile: post.selectedFile,
    likeCount: post.likeCount,
    createdAt: post.createdAt,
    DeletedOn: new Date(),
  };
  const TrashPost = new TrashMessage(newTrash);
  try {
    await TrashPost.save();
    await PostMessage.findByIdAndDelete(_id);
    res.status(203).json({ message: 'Post Deleted' });
  } catch {
    res.status(404).json({ message: error.message });
  }
};
export const Likes = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'Invalid Request' });
  let find = await PostMessage.findById(_id);
  if (find === null) return res.status(404).json({ message: 'Id Not Found' });
  const star = {
    title: find.title,
    message: find.message,
    creator: find.creator,
    tags: find.tags,
    selectedFile: find.selectedFile,
    likeCount: 1,
    createdAt: find.createdAt,
    post_id: find._id,
  };
  const Starred = new StarredMessage(star);
  find.likeCount = find.likeCount + 1;
  try {
    await Starred.save();
    await PostMessage.findByIdAndUpdate(_id, find, {
      new: true,
    });
    res.status(203).json({ message: 'Like Count Increased' });
  } catch {
    res.status(500).json({ message: 'internal server error' });
  }
};
export const getTrash = async (req, res) => {
  try {
    const postMessages = await TrashMessage.find();
    res.status(200).json(postMessages);
  } catch {
    res.status(404).json({ message: 'No Post Found' });
  }
};
export const starred = async (req, res) => {
  try {
    const postMessages = await StarredMessage.find();
    res.status(200).json(postMessages);
  } catch {
    res.status(404).json({ message: 'No Starred Post Found' });
  }
};
export const restore = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'Invalid Request' });
  let find = await TrashMessage.findById(_id);
  if (find === null) return res.status(404).json({ message: 'Id Not Found' });
  const restore = {
    title: find.title,
    message: find.message,
    creator: find.creator,
    tags: find.tags,
    selectedFile: find.selectedFile,
    likeCount: 0,
    createdAt: find.createdAt,
  };
  const Restored = new PostMessage(restore);
  try {
    await Restored.save();
    await TrashMessage.findByIdAndDelete(_id);
    res.status(203).json({ message: 'Post Restored' });
  } catch {
    res.status(500).json({ message: 'internal server error' });
  }
};

export const RemovePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'Invalid' });
  const post = await TrashMessage.findById(_id);
  if (post === null) return res.status(404).json({ message: 'Id Not Found' });
  try {
    await TrashMessage.findByIdAndDelete(_id);
    res.status(203).json({ message: 'Post Deleted' });
  } catch {
    res.status(404).json({ message: error.message });
  }
};

export const unstar = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'Invalid Request' });
  let find = await StarredMessage.findById(_id);
  if (find === null) return res.status(404).json({ message: 'Id Not Found' });
  try {
    find.likeCount = !find.likeCount;
    console.log(find.post_id);
    const data = await PostMessage.findByIdAndUpdate(find.post_id, find, {
      new: true,
    });
    console.log(data);
    await StarredMessage.findByIdAndDelete(_id);

    res.status(203).json({ message: 'Post Unstarred' });
  } catch {
    res.status(500).json({ message: 'internal server error' });
  }
};
