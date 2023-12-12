import UserModel from '../models/User.js';
import { verifyToken } from '../helpers/token.js';

export default async (req, res, next) => {
	const token = req.cookies.token || '';

	if (token) {
		try {
			const tokenData = verifyToken(req.cookies.token);

			const user = await UserModel.findById(tokenData.id);

			if (!user) {
				return res
					.status(404)
					.send({ error: 'Аутентифицированный пользователь не найден' });
			}

			req.user = user;
			next();
		} catch (err) {
			return res.status(403).send({
				error: 'Отсутствует аутентификация',
			});
		}
	} else {
		return res.status(403).send({
			error: 'Отсутствует аутентификация',
		});
	}
};
