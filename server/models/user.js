import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, //makes this feild inacessible
    },
  },
  {
    timeStamps: true, //automatically adds createdAt and UpdatedAt fields to schema
  }
);

export default mongoose.model('User', userSchema);
