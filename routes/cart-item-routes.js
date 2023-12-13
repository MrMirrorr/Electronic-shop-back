import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import * as CartItemController from '../controllers/cart-item.js';

const router = express.Router();

router.post('/items', checkAuth, CartItemController.create);
router.delete('/:cartId/items/:itemId', checkAuth, CartItemController.remove);

export default router;