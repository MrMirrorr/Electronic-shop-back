import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		products: [
			{
				id: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				title: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				total: {
					type: Number,
					required: true,
				},
			},
		],
		totalSum: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Order', OrderSchema);
