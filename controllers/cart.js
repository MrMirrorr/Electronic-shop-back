import CartModel from '../models/Cart.js';
import mapCart from '../helpers/map-cart.js';

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
		console.log(err);
		if (err.code === 11000) {
			return res.status(500).send({
				error: 'Корзина уже существует',
			});
		}
		res.status(500).send({
			error: 'Не удалось создать корзину',
		});
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
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить корзину',
		});
	}
};
