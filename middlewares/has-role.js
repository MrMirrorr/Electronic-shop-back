export default (rolesArray) => (req, res, next) =>
	rolesArray.includes(req.user.roleId)
		? next()
		: res.send({ error: 'Доступ запрещен' });
