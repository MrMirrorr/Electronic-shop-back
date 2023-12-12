import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const sign = process.env.JWT_SECRET;

export const generateToken = (data) =>
	jwt.sign(data, sign, {
		expiresIn: '30d',
	});

export const verifyToken = (token) => jwt.verify(token, sign);
