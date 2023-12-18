export default (rolesArray) => (req, res, next) =>
	rolesArray.includes(req.user.roleId)
		? next()
		: res.status(403).send({ error: 'Доступ запрещен' });
