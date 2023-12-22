import express from 'express';
import { productCreateValidation } from '../validations.js';
import { checkAuth, hasRole, handleValidationErrors } from '../middlewares/index.js';
import * as ProductController from '../controllers/product.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.post(
	'/',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	productCreateValidation,
	handleValidationErrors,
	ProductController.create,
);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.patch(
	'/:id',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	productCreateValidation,
	handleValidationErrors,
	ProductController.update,
);
router.delete('/:id', checkAuth, hasRole([ROLE.ADMIN]), ProductController.remove);

export default router;
