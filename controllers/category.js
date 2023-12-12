import CategoryModel from '../models/Category.js';
import mapCategory from '../helpers/map-category.js';

// create new category
export const create = async (req, res) => {
	try {
		const category = await CategoryModel.create({
			title: req.body.title,
		});

		res.send({
			error: null,
			data: mapCategory(category),
		});
	} catch (err) {
		res.status(500).send({
			error: 'Не удалось создать категорию',
		});
	}
};

// get all categories
export const getAll = async (_, res) => {
	try {
		const categories = await CategoryModel.find();

		res.send({
			error: null,
			data: categories.map(mapCategory),
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить категории',
		});
	}
};

// delete
export const remove = async (req, res) => {
	try {
		const categoryId = req.params.id;
		await CategoryModel.deleteOne({ _id: categoryId });

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось удалить категорию',
			success: false,
		});
	}
};

// update
export const update = async (req, res) => {
	try {
		const categoryId = req.params.id;
		const newData = req.body;

		const newCategory = await CategoryModel.findByIdAndUpdate(categoryId, newData, {
			returnDocument: 'after',
		});

		res.send({
			error: null,
			data: newCategory,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось изменить категорию',
			success: false,
		});
	}
};
