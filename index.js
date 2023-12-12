import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { registerValidation } from './validations/auth.js';
import checkAuth from './middlewares/check-auth.js';
import hasRole from './middlewares/has-role.js';
import * as UserController from './controllers/user.js';
import { ROLE } from './constants/roles.js';

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.post('/auth/register', registerValidation, UserController.register);

app.post('/auth/login', UserController.login);

app.post('/auth/logout', UserController.logout);

app.get('/users', checkAuth, hasRole([ROLE.ADMIN]), UserController.getUsers);

app.get('/users/roles', checkAuth, hasRole([ROLE.ADMIN]), UserController.getRoles);

app.patch('/users/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.updateUser);

app.delete('/users/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.deleteUser);

app.listen(port, (err) =>
	err ? console.log('Server error', err) : console.log(`Server OK | Port: ${port}`),
);
