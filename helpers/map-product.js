import mongoose from 'mongoose';
import mapComment from './map-comment.js';

export default (product) => ({
	id: product._id,
	title: product.title,
	categoryId: product.categoryId,
	price: product.price,
	amount: product.amount,
	description: product.description,
	createdAt: product.createdAt,
	comments: product.comments.map((comment) =>
		mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment),
	),
});
