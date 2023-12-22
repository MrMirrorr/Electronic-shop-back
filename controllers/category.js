import { CategoryModel } from '../models/index.js';
import mapCategory from '../helpers/map-category.js';
import serverErrorHandler from '../utils/server-error-handler.js';

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
		serverErrorHandler(res, err, 'Не удалось создать категорию');
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
		serverErrorHandler(res, err, 'Не удалось получить категории');
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
		serverErrorHandler(res, err, 'Не удалось удалить категорию');
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
		serverErrorHandler(res, err, 'Не удалось изменить категорию');
	}
};
