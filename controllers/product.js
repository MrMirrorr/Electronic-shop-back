import {
	ProductModel,
	CommentModel,
	CartModel,
	CartItemModel,
	FavoriteModel,
} from '../models/index.js';
import mapProduct from '../helpers/map-product.js';
import serverErrorHandler from '../utils/server-error-handler.js';

// create new product
export const create = async (req, res) => {
	try {
		const product = await ProductModel.create({
			title: req.body.title,
			categoryId: req.body.categoryId,
			price: req.body.price,
			amount: req.body.amount,
			imageUrl: req.body.imageUrl,
			description: req.body.description,
		});

		res.send({
			error: null,
			data: mapProduct(product),
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось создать товар');
	}
};

// get all products with search and pagination
export const getAll = async (req, res) => {
	try {
		const searchPhrase = req.query.search || '';
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const category = req.query.category || '';
		const sort = req.query.sort || 'asc';

		const findQuery = {
			title: { $regex: searchPhrase, $options: 'i' },
		};

		if (category) {
			findQuery.categoryId = category;
		}

		const [products, count] = await Promise.all([
			ProductModel.find(findQuery)
				.populate('categoryId')
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ price: sort === 'asc' ? 1 : -1 }),
			ProductModel.countDocuments(findQuery),
		]);

		res.send({
			error: null,
			data: {
				products: products.map(mapProduct),
				lastPage: Math.ceil(count / limit),
			},
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось получить товары');
	}
};

// get one
export const getOne = async (req, res) => {
	try {
		const productId = req.params.id;

		const product = await ProductModel.findById(productId).populate({
			path: 'comments',
			populate: 'author',
			options: { sort: { createdAt: -1 } },
		});

		res.send({
			error: null,
			data: mapProduct(product),
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось получить товар');
	}
};

// delete
export const remove = async (req, res) => {
	try {
		const productId = req.params.id;

		const product = await ProductModel.findOne({ _id: productId });

		const commentsToDelete = product.comments.map((comment) => comment._id);

		if (commentsToDelete.length > 0) {
			await CommentModel.deleteMany({ _id: { $in: commentsToDelete } });
		}

		const cartItems = await CartItemModel.find({ productId }, '_id').lean();
		const cartItemIds = cartItems.map((item) => item._id);

		if (cartItemIds.length > 0) {
			await CartItemModel.deleteMany({ productId });

			await CartModel.updateMany(
				{ items: { $in: cartItemIds } },
				{ $pull: { items: { $in: cartItemIds } } },
			);
		}

		const favorites = await FavoriteModel.find({ product: productId });

		if (favorites.length > 0) {
			await FavoriteModel.deleteMany({ product: productId });
		}

		await ProductModel.deleteOne({ _id: productId });

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось удалить товар');
	}
};

// update
export const update = async (req, res) => {
	try {
		const productId = req.params.id;
		const newData = req.body;

		const newProduct = await ProductModel.findByIdAndUpdate(productId, newData, {
			returnDocument: 'after',
		}).populate({
			path: 'comments',
			populate: 'author',
		});

		res.send({
			error: null,
			data: mapProduct(newProduct),
		});
	} catch (err) {
		serverErrorHandler(res, err, 'Не удалось изменить категорию');
	}
};
