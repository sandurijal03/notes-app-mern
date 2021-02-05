import { Router } from 'express';

const router = Router();

// register user
router.post('/register', (req, res) => {
  res.json({ msg: 'Register a user' });
});

// login a user
router.post('/login', (req, res) => {
  res.json({ msg: 'Login a user' });
});

export default router;
