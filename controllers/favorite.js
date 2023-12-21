import mapFavorite from '../helpers/map-favorite.js';
import FavoriteModel from '../models/Favorite.js';

// create favorite
export const create = async (req, res) => {
	try {
		const userId = req.user.id;
		const productId = req.params.productId;

		let favorite = await FavoriteModel.findOne({ userId, product: productId });

		if (favorite) {
			await FavoriteModel.deleteOne({ userId, product: productId });
			res.send({ operation: 'DELETE', data: { favorite: null } });
		} else {
			favorite = await FavoriteModel.create({ userId, product: productId });

			await favorite.populate('product');

			res.send({ operation: 'CREATE', data: { favorite: mapFavorite(favorite) } });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось добавить/удалить товар в/из избранное',
		});
	}
};

// delete favorite

export const remove = async (req, res) => {
	try {
		const favoriteId = req.params.favoriteId;

		await FavoriteModel.deleteOne({ _id: favoriteId });

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось удалить товар из избранного',
			success: false,
		});
	}
};

// get favorites

export const getAll = async (req, res) => {
	try {
		const userId = req.user.id;

		const favorites = await FavoriteModel.find({ userId }).populate('product');

		res.send({
			error: null,
			data: { favorites: favorites.map(mapFavorite) },
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить избранные товары',
			success: false,
		});
	}
};
