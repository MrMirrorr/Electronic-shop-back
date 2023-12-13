import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
	{
		cartId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cart',
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
		quantity: {
			type: Number,
			default: 1,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('CartItem', CartItemSchema);
