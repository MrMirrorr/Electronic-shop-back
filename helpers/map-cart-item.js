import mongoose from 'mongoose';
import mapProductInCart from '../helpers/map-product-in-cart.js';

export default (cartItem) => {
	if (mongoose.isObjectIdOrHexString(cartItem.productId)) {
		return {
			id: cartItem._id,
			cartId: cartItem.cartId,
			productId: cartItem.productId,
			quantity: cartItem.quantity,
			createdAt: cartItem.createdAt,
			updatedAt: cartItem.updatedAt,
		};
	}

	return {
		id: cartItem._id,
		cartId: cartItem.cartId,
		product: mapProductInCart(cartItem.productId),
		quantity: cartItem.quantity,
		createdAt: cartItem.createdAt,
		updatedAt: cartItem.updatedAt,
	};
};
