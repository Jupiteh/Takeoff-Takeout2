import { Router } from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder, getConfirmedOrdersByClients, getAcceptedOrdersByRestaurants, getAcceptedOrdersByDeliveryMan, 
    checkValidationCode, getDecryptedValidationCode } from '../controllers/orderController';
// import { getOrders, updateOrder, deleteOrder, getConfirmedOrdersByClients, getAcceptedOrdersByRestaurants, getAcceptedOrdersByDeliveryMan } from '../controllers/orderController';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/confirmed/:restaurantIds', getConfirmedOrdersByClients);
router.get('/orders/accepted', getAcceptedOrdersByRestaurants);
router.get('/orders/deliveryman/:deliveryManId', getAcceptedOrdersByDeliveryMan);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.post('/orders/checkValidationCode', checkValidationCode);
router.get('/orders/getDecryptedValidationCode/:id', getDecryptedValidationCode);

export default router;
