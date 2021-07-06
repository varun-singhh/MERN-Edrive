import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decodedData;
    if (token) decodedData = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decodedData.id);
    if (!user) throw Error();
    req.user = user._id;
    next();
  } catch (error) {
    return res.status(404).json({ message: 'Invalid Token' });
  }
};
export default auth;
