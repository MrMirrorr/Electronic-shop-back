import mongoose from 'mongoose';
import { ROLE } from '../constants/roles.js';

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatarUrl: String,
		roleId: {
			type: Number,
			default: ROLE.USER,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', UserSchema);
