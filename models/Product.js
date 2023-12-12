import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		imageUrl: String,
		description: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Product', ProductSchema);
