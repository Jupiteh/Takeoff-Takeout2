import { Router } from 'express';
import { getCarts, getCartByClientId, createOrUpdateCart, deleteCart } from '../controllers/cartController';

const router = Router();

router.get('/carts', getCarts);
router.get('/carts/:clientId', getCartByClientId);
router.post('/carts', createOrUpdateCart);
router.delete('/carts/:id', deleteCart);

export default router;
