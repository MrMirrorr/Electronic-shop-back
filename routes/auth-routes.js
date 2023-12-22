import express from 'express';
import { loginValidation, registerValidation } from '../validations.js';
import { checkAuth, handleValidationErrors } from '../middlewares/index.js';
import * as UserController from '../controllers/user.js';

const router = express.Router();

router.post(
	'/register',
	registerValidation,
	handleValidationErrors,
	UserController.register,
);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.get('/me', checkAuth, UserController.getMe);
router.post('/logout', UserController.logout);

export default router;
