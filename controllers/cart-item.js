import CartModel from '../models/Cart.js';
import CartItemModel from '../models/CartItem.js';

// create cart item
export const create = async (req, res) => {
	try {
		const userId = req.user.id;
		const { productId, quantity } = req.body;

		let cart = await CartModel.findOne({ userId });
		console.log(cart);

		if (!cart) {
			cart = await CartModel.create({
				userId,
			});
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

		res.send({
			error: null,
			data: { cart, cartItem },
		});
	} catch (error) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось добавить товар в корзину',
		});
	}
};

// delete cart item

export const remove = async (req, res) => {
	try {
		const cartId = req.params.cartId;
		const itemId = req.params.itemId;

		await CartItemModel.deleteOne({ _id: itemId });
		await CartModel.findByIdAndUpdate(cartId, {
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
