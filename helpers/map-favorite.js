import mongoose from 'mongoose';
import mapProduct from './map-product.js';

export default (favorite) => {
	return {
		id: favorite._id,
		product: mongoose.isObjectIdOrHexString(favorite.product)
			? favorite.product
			: mapProduct(favorite.product),
		createdAt: favorite.createdAt,
	};
};
