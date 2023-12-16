import express from 'express';
import { loginValidation, registerValidation } from '../validations.js';
import checkAuth from '../middlewares/check-auth.js';
import * as UserController from '../controllers/user.js';

const router = express.Router();

router.post('/register', registerValidation, UserController.register);
router.post('/login', loginValidation, UserController.login);
router.get('/me', checkAuth, UserController.getMe);
router.post('/logout', UserController.logout);

export default router;
