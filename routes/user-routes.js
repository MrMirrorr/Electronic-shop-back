import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import hasRole from '../middlewares/has-role.js';
import * as UserController from '../controllers/user.js';

const router = express.Router();

router.get('/users', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllUsers);
router.get('/users/roles', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllRoles);
router.patch('/users/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.update);
router.delete('/users/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.remove);

export default router;
