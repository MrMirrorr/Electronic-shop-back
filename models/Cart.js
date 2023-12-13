import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			unique: true,
		},
		items: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'CartItem',
			},
		],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Cart', CartSchema);
