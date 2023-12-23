import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import axios from 'axios';

import {
	authRoutes,
	uploadRoutes,
	userRoutes,
	categoryRoutes,
	productRoutes,
	commentRoutes,
	cartRoutes,
	cartItemRoutes,
	orderRoutes,
	favoriteRoutes,
} from './routes/index.js';

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// auth
app.use('/auth', authRoutes);
// upload
app.use('/upload', uploadRoutes);
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
// favorite
app.use('/favorites', favoriteRoutes);
// currency rates api
app.get('/currency-rates', async (_, res) => {
	try {
		const response = await axios.get(
			'https://www.agroprombank.com/xmlinformer.php?type=official',
		);
		res.set('Content-Type', 'text/xml');
		res.send(response.data);
	} catch (error) {
		console.error('Error fetching currency rates', error);
		res.status(500).send('Error fetching currency rates');
	}
});

app.listen(port, (err) =>
	err ? console.log('Server error', err) : console.log(`Server OK | Port: ${port}`),
);
