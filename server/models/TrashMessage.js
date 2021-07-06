import mongoose from 'mongoose';

const TrashSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  DeletedOn: {
    type: Date,
    default: new Date(),
  },
});
const TrashMessage = mongoose.model('TrashMessage', TrashSchema);
export default TrashMessage;
