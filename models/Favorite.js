import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Favorite', FavoriteSchema);
