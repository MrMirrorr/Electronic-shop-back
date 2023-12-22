import express from 'express';
import { checkAuth } from '../middlewares/index.js';
import * as CartController from '../controllers/cart.js';

const router = express.Router();

router.post('/', checkAuth, CartController.create);
router.get('/', checkAuth, CartController.getOne);

export default router;
