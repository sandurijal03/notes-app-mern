import User from '../models/User';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'The email already exists' });
      }
      const passwordHash = await hash(password, 12);
      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });
      res.json(newUser);

      await newUser.save();
      res.status(200).json({
        msg: 'Signup success.',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

    res.json({ msg: 'Register a user' });
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'User doesnot exist.' });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect password.' });
      }

      // if login success create token
      const payload = {
        id: user._id,
        name: user.username,
      };
      const token = sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d',
      });

      res.json({ token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

    res.json({ msg: 'Login a user' });
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.send(false);
      }

      verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await User.findById(verified.id);
        if (!user) {
          return res.send(false);
        }

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
