import express from 'express';
import { checkAuth } from '../middlewares/index.js';
import * as FavoriteController from '../controllers/favorite.js';

const router = express.Router();

router.post('/product/:productId', checkAuth, FavoriteController.create);
router.get('/', checkAuth, FavoriteController.getAll);
router.delete('/:favoriteId', checkAuth, FavoriteController.remove);

export default router;
