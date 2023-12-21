import mongoose from 'mongoose';
import mapProductInOrder from './map-product-in-order.js';
import mapUser from './map-user.js';

export default (order) => ({
	id: order._id,
	products: order.products.map((product) => mapProductInOrder(product)),
	totalSum: order.totalSum,
	user: mongoose.isObjectIdOrHexString(order.user) ? order.user : mapUser(order.user),
	createdAt: order.createdAt,
});
