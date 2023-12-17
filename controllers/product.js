import mapProduct from '../helpers/map-product.js';
import ProductModel from '../models/Product.js';

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
		res.status(500).send({
			error: 'Не удалось создать товар',
		});
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
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить товары',
		});
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
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить товар',
		});
	}
};

// delete
export const remove = async (req, res) => {
	try {
		const productId = req.params.id;
		await ProductModel.deleteOne({ _id: productId });

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось удалить товар',
			success: false,
		});
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
		console.log(err);
		res.status(500).send({
			error: 'Не удалось изменить категорию',
			success: false,
		});
	}
};
