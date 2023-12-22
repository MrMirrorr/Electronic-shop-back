import { CommentModel, ProductModel } from '../models/index.js';
import mapComment from '../helpers/map-comment.js';
import serverErrorHandler from '../utils/server-error-handler.js';

// create new comment
export const create = async (req, res) => {
	try {
		const content = req.body.content;
		const productId = req.params.id;
		const author = req.user.id;

		const newComment = await CommentModel.create({
			content,
			author,
		});

		await ProductModel.findByIdAndUpdate(productId, {
			$push: { comments: newComment },
		});

		await newComment.populate('author');

		res.send({
			error: null,
			data: mapComment(newComment),
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось создать комментарий');
	}
};

// delete
export const remove = async (req, res) => {
	try {
		const productId = req.params.productId;
		const commentId = req.params.commentId;

		await CommentModel.deleteOne({ _id: commentId });
		await ProductModel.findByIdAndUpdate(productId, {
			$pull: { comments: commentId },
		});

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось удалить комментарий');
	}
};
