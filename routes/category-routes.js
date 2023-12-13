import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import hasRole from '../middlewares/has-role.js';
import * as CategoryController from '../controllers/category.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.post('/', checkAuth, hasRole([ROLE.ADMIN]), CategoryController.create);
router.get('/', CategoryController.getAll);
router.patch('/:id', checkAuth, hasRole([ROLE.ADMIN]), CategoryController.update);
router.delete('/:id', checkAuth, hasRole([ROLE.ADMIN]), CategoryController.remove);

export default router;
