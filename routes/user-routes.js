import express from 'express';
import { checkAuth, handleValidationErrors, hasRole } from '../middlewares/index.js';
import * as UserController from '../controllers/user.js';
import { ROLE } from '../constants/roles.js';
import { updateUserValidation } from '../validations.js';

const router = express.Router();

router.get('/', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllUsers);
router.get('/roles', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllRoles);
router.patch('/:id/role', checkAuth, hasRole([ROLE.ADMIN]), UserController.updateRoleId);
router.patch(
	'/user',
	checkAuth,
	updateUserValidation,
	handleValidationErrors,
	UserController.update,
);
router.delete('/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.remove);

export default router;
