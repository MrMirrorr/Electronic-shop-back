import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { registerValidation, loginValidation } from './validations.js';
import checkAuth from './middlewares/check-auth.js';
import hasRole from './middlewares/has-role.js';
import * as UserController from './controllers/user.js';
import * as CategoryController from './controllers/category.js';
import * as ProductController from './controllers/product.js';
import * as CommentController from './controllers/comment.js';
import * as CartController from './controllers/cart.js';
import * as CartItemController from './controllers/cart-item.js';
import { ROLE } from './constants/roles.js';

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

// user
app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/logout', UserController.logout);
app.get('/users', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllUsers);
app.get('/users/roles', checkAuth, hasRole([ROLE.ADMIN]), UserController.getAllRoles);
app.patch('/users/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.update);
app.delete('/users/:id', checkAuth, hasRole([ROLE.ADMIN]), UserController.remove);

// category
app.post('/categories', checkAuth, hasRole([ROLE.ADMIN]), CategoryController.create);
app.get('/categories', CategoryController.getAll);
app.patch('/categories/:id', checkAuth, hasRole([ROLE.ADMIN]), CategoryController.update);
app.delete(
	'/categories/:id',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	CategoryController.remove,
);

// product
app.post('/products', checkAuth, hasRole([ROLE.ADMIN]), ProductController.create);
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
app.patch('/products/:id', checkAuth, hasRole([ROLE.ADMIN]), ProductController.update);
app.delete('/products/:id', checkAuth, hasRole([ROLE.ADMIN]), ProductController.remove);

// comment
app.post('/products/:id/comments', checkAuth, CommentController.create);
app.delete(
	'/products/:productId/comments/:commentId',
	checkAuth,
	hasRole([ROLE.ADMIN]),
	CommentController.remove,
);

// cart
app.post('/carts', checkAuth, CartController.create);
app.get('/carts', checkAuth, CartController.getOne);

// cart item
app.post('/carts/items', checkAuth, CartItemController.create);
app.delete('/carts/:cartId/items/:itemId', checkAuth, CartItemController.remove);

app.listen(port, (err) =>
	err ? console.log('Server error', err) : console.log(`Server OK | Port: ${port}`),
);
