export const uploadImage = (req, res) => {
	res.send({
		url: `/uploads/${req.file.originalname}`,
	});
};
