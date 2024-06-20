import { Router } from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder, getConfirmedOrdersByRestaurants, getAcceptedOrdersByRestaurants, getAcceptedOrdersByDeliveryMan } from '../controllers/orderController';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/confirmed/:restaurantIds', getConfirmedOrdersByRestaurants);
router.get('/orders/accepted/:restaurantIds', getAcceptedOrdersByRestaurants);
router.get('/orders/deliveryman/:deliveryManId', getAcceptedOrdersByDeliveryMan);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;
