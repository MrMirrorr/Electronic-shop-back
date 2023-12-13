import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import hasRole from '../middlewares/has-role.js';
import * as CommentController from '../controllers/comment.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.post('/:id/comments', checkAuth, CommentController.create);
router.delete(
	'/:productId/comments/:commentId',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	CommentController.remove,
);

export default router;
