import mongoose from 'mongoose';

const StarredSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  post_id: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const StarredMessage = mongoose.model('StarredMessage', StarredSchema);
export default StarredMessage;
