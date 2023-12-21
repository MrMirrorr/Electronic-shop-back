import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		let filename = file.originalname;
		let filepath = path.join('uploads', filename);

		fs.access(filepath, fs.constants.F_OK, (err) => {
			if (!err) {
				const fileExt = path.extname(filename);
				const nameWithoutExt = path.basename(filename, fileExt);
				filename = `${nameWithoutExt}-${uniqueSuffix}${fileExt}`;
			}
			cb(null, filename);
		});
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
