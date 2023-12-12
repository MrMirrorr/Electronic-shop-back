import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import mapUser from '../helpers/map-user.js';
import { generateToken } from '../helpers/token.js';
import { ROLE } from '../constants/roles.js';

// register
export const register = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send(errors.array());
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const user = await UserModel.create({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			password: passwordHash,
		});

		const token = generateToken({
			id: user.id,
		});

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			data: mapUser(user),
		});
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			return res.status(500).send({
				error: 'Этот email уже зарегистрирован',
			});
		}
		res.status(500).send({
			error: 'Не удалось зарегистрироваться',
		});
	}
};

// login
export const login = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send(errors.array());
		}

		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).send({
				error: 'Пользователь не найден',
			});
		}
		console.log(user);
		const isValidPass = await bcrypt.compare(req.body.password, user.password);

		if (!isValidPass) {
			return res.status(400).send({
				error: 'Неверный логин или пароль',
			});
		}

		const token = generateToken({
			id: user.id,
		});

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			data: mapUser(user),
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось авторизоваться',
		});
	}
};

// logout
export const logout = (_, res) => {
	try {
		res.cookie('token', '', { httpOnly: true }).send({
			error: null,
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось выйти',
		});
	}
};

// get all users
export const getAllUsers = async (_, res) => {
	try {
		const users = await UserModel.find();

		res.send({
			error: null,
			data: users.map(mapUser),
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось получить пользователей',
		});
	}
};

// get all roles
export const getAllRoles = async (_, res) => {
	const roles = [
		{ id: ROLE.ADMIN, name: 'Администратор' },
		{ id: ROLE.USER, name: 'Пользователь' },
	];

	res.send({
		data: roles,
	});
};

// delete
export const remove = async (req, res) => {
	try {
		const userId = req.params.id;
		await UserModel.deleteOne({ _id: userId });

		res.send({
			error: null,
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось удалить пользователя',
			success: false,
		});
	}
};

// edit (roles)
export const update = async (req, res) => {
	try {
		const userId = req.params.id;
		const newRoleId = req.body.roleId;

		const newUser = await UserModel.findByIdAndUpdate(
			userId,
			{ roleId: newRoleId },
			{
				returnDocument: 'after',
			},
		);

		res.send({
			error: null,
			data: mapUser(newUser),
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: 'Не удалось удалить пользователя',
			success: false,
		});
	}
};
