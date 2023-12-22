import { FavoriteModel } from '../models/index.js';
import mapFavorite from '../helpers/map-favorite.js';
import serverErrorHandler from '../utils/server-error-handler.js';

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
		serverErrorHandler(res, err, 'Не удалось добавить/удалить товар в/из избранное');
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
		serverErrorHandler(res, err, 'Не удалось удалить товар из избранного');
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
		serverErrorHandler(res, err, 'Не удалось получить избранные товары');
	}
};
