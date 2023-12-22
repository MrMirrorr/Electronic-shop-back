import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const categoryCreateValidation = [
	body('title', 'Введите название категории. Не меньше 3 символов')
		.isLength({ min: 3 })
		.isString(),
];

export const productCreateValidation = [
	body('title', 'Введите заголовок товара. Не меньше 3 символов')
		.isLength({ min: 3 })
		.isString(),
	body('categoryId', 'Выберите категорию').isNumeric(),
	body('price', 'Введите цену числом').isNumeric(),
	body('amount', 'Введите количество числом').isNumeric(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
	body('description', 'Введите описание. Не меньше 5 символов')
		.isLength({ min: 5 })
		.isString(),
];

export const commentCreateValidation = [
	body('content', 'Нечего отправлять. Вы не ввели комментарий.').isLength({ min: 1 }),
];

export const updateUserValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isString(),
];
