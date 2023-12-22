import { CartModel } from '../models/index.js';
import mapCart from '../helpers/map-cart.js';
import serverErrorHandler from '../utils/server-error-handler.js';

// create cart
export const create = async (req, res) => {
	try {
		const userId = req.user.id;

		const cart = await CartModel.create({
			userId,
		});
		res.send({
			error: null,
			data: cart,
		});
	} catch (err) {
		if (err.code === 11000) {
			console.log(err);
			return res.status(500).send({
				error: 'Корзина уже существует',
			});
		}
		serverErrorHandler(res, err, 'Не удалось создать корзину');
	}
};

// get cart
export const getOne = async (req, res) => {
	try {
		const userId = req.user.id;

		const cart = await CartModel.findOne({ userId }).populate({
			path: 'items',
			populate: 'productId',
		});

		res.send({
			error: null,
			data: mapCart(cart),
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось получить корзину');
	}
};
