import express from 'express';
import { categoryCreateValidation } from '../validations.js';
import { checkAuth, hasRole, handleValidationErrors } from '../middlewares/index.js';
import * as CategoryController from '../controllers/category.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.post(
	'/',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	categoryCreateValidation,
	handleValidationErrors,
	CategoryController.create,
);
router.get('/', CategoryController.getAll);
router.patch(
	'/:id',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	categoryCreateValidation,
	handleValidationErrors,
	CategoryController.update,
);
router.delete('/:id', checkAuth, hasRole([ROLE.ADMIN]), CategoryController.remove);

export default router;
