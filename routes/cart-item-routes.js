import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import * as CartItemController from '../controllers/cart-item.js';

const router = express.Router();

router.post('/', checkAuth, CartItemController.create);
router.delete('/:itemId', checkAuth, CartItemController.remove);
router.delete('/cart/:cartId', checkAuth, CartItemController.removeMany);

export default router;
