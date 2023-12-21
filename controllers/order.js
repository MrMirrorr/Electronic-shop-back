import mapOrder from '../helpers/map-order.js';
import OrderModel from '../models/Order.js';

// create order
export const create = async (req, res) => {
	try {
		const userId = req.user.id;
		const { products, totalSum } = req.body;

		const order = await OrderModel.create({
			products,
			totalSum,
			user: userId,
		});

		res.send({
			error: null,
			data: mapOrder(order),
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось создать заказ',
		});
	}
};

// get orders
export const getAll = async (req, res) => {
	try {
		const userId = req.user.id;

		const orders = await OrderModel.find({ user: userId })
			.sort({ createdAt: -1 })
			.populate('user');

		res.send({
			error: null,
			data: orders.map(mapOrder),
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить заказы',
		});
	}
};
