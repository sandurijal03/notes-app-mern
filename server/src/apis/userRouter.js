import { Router } from 'express';
import userCtrl from '../controllers/userCtrl';

const router = Router();

// register user
router.post('/register', userCtrl.register);

// login a user
router.post('/login', userCtrl.login);

// verify Token
router.get('/verify', userCtrl.verifiedToken);

export default router;
