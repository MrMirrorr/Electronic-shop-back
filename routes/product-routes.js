import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import hasRole from '../middlewares/has-role.js';
import * as ProductController from '../controllers/product.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.post('/', checkAuth, hasRole([ROLE.ADMIN]), ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.patch('/:id', checkAuth, hasRole([ROLE.ADMIN]), ProductController.update);
router.delete('/:id', checkAuth, hasRole([ROLE.ADMIN]), ProductController.remove);

export default router;
