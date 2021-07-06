import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email }).select('+password');
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't Exist" });
    const isPassCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPassCorrect)
      return res.status(404).json({ message: "Password doesn't match" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.JWT_TOKEN,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: 'User already exist' });
    if (password !== confirmPassword)
      return res.status(404).json({ message: 'password mismatched' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await user.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_TOKEN,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
