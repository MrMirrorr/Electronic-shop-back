import multer from 'multer';

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

export default async (req, res, next) => {
	upload.single('image')(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return res
				.status(400)
				.send({ error: 'Ошибка загрузки файла: ' + err.message });
		} else if (err) {
			return res.status(500).send({ error: 'Ошибка сервера: ' + err.message });
		}
		next();
	});
};
