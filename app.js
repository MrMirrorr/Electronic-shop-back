import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth-routes.js';
import categoryRoutes from './routes/category-routes.js';
import productRoutes from './routes/product-routes.js';
import commentRoutes from './routes/comment-routes.js';
import cartRoutes from './routes/cart-routes.js';
import cartItemRoutes from './routes/cart-item-routes.js';

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

// user
app.use('/auth', authRoutes);

// category
app.use('/categories', categoryRoutes);

// product
app.use('/products', productRoutes);

// comment
app.use('/products', commentRoutes);

// cart
app.use('/carts', cartRoutes);

// cart item
app.use('/carts', cartItemRoutes);

app.listen(port, (err) =>
	err ? console.log('Server error', err) : console.log(`Server OK | Port: ${port}`),
);
