import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import hasRole from '../middlewares/has-role.js';
import * as UserController from '../controllers/user.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.get('/', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllUsers);
router.get('/roles', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllRoles);
router.patch('/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.update);
router.delete('/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.remove);

export default router;
