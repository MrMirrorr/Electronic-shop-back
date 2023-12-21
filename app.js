import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/user-routes.js';
import categoryRoutes from './routes/category-routes.js';
import productRoutes from './routes/product-routes.js';
import commentRoutes from './routes/comment-routes.js';
import cartRoutes from './routes/cart-routes.js';
import cartItemRoutes from './routes/cart-item-routes.js';
import orderRoutes from './routes/order-routes.js';

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

// auth
app.use('/auth', authRoutes);

// user
app.use('/users', userRoutes);

// category
app.use('/categories', categoryRoutes);

// product
app.use('/products', productRoutes);

// comment
app.use('/products', commentRoutes);

// cart
app.use('/cart', cartRoutes);

// cart item
app.use('/items', cartItemRoutes);

// order
app.use('/orders', orderRoutes);

app.listen(port, (err) =>
	err ? console.log('Server error', err) : console.log(`Server OK | Port: ${port}`),
);
