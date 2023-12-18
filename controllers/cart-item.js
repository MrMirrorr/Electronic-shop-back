import CartModel from '../models/Cart.js';
import CartItemModel from '../models/CartItem.js';
import mapCartItem from '../helpers/map-cart-item.js';

// create cart item
export const create = async (req, res) => {
	try {
		const userId = req.user.id;
		const { productId, quantity } = req.body;

		let cart = await CartModel.findOne({ userId });

		if (!cart) {
			cart = await CartModel.create({ userId });
		}

		let cartItem = await CartItemModel.findOne({ cartId: cart._id, productId });

		if (cartItem) {
			cartItem.quantity += quantity;
			await cartItem.save();
		} else {
			cartItem = await CartItemModel.create({
				cartId: cart._id,
				productId,
				quantity,
			});
			cart.items.push(cartItem._id);
			await cart.save();
		}

		await cartItem.populate('productId');

		res.send({
			error: null,
			data: { cartItem: mapCartItem(cartItem) },
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось добавить товар в корзину',
		});
	}
};

// delete cart item

export const remove = async (req, res) => {
	try {
		const userId = req.user.id;
		const itemId = req.params.itemId;

		let cart = await CartModel.findOne({ userId });

		await CartItemModel.deleteOne({ _id: itemId });
		await CartModel.findByIdAndUpdate(cart._id, {
			$pull: { items: itemId },
		});

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось удалить товар из корзины',
			success: false,
		});
	}
};
