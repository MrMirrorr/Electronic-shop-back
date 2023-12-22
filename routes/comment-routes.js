import express from 'express';
import { commentCreateValidation } from '../validations.js';
import { checkAuth, hasRole, handleValidationErrors } from '../middlewares/index.js';
import * as CommentController from '../controllers/comment.js';
import { ROLE } from '../constants/roles.js';

const router = express.Router();

router.post(
	'/:id/comments',
	checkAuth,
	commentCreateValidation,
	handleValidationErrors,
	CommentController.create,
);
router.delete(
	'/:productId/comments/:commentId',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	CommentController.remove,
);

export default router;
