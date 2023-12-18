import mongoose from 'mongoose';
import mapCartItem from './map-cart-item.js';

export default (cart) => ({
	id: cart._id,
	userId: cart.userId,
	items: cart.items.map((cartItem) =>
		mongoose.isObjectIdOrHexString(cartItem) ? cartItem : mapCartItem(cartItem),
	),
	createdAt: cart.createdAt,
	updatedAt: cart.updatedAt,
});
