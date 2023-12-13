import express from 'express';
import checkAuth from '../middlewares/check-auth.js';
import * as CartController from '../controllers/cart.js';

const router = express.Router();

router.post('/', checkAuth, CartController.create);
router.get('/', checkAuth, CartController.getOne);

export default router;
