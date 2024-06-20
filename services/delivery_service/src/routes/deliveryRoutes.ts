import { Router } from 'express';
import { createDelivery, getDeliveries, getDeliveryById, updateDelivery, deleteDelivery } from '../controllers/deliveryController';

const router = Router();

router.post('/deliveries', createDelivery);
router.get('/deliveries', getDeliveries);
router.get('/deliveries/:id', getDeliveryById);
router.put('/deliveries/:id', updateDelivery);
router.delete('/deliveries/:id', deleteDelivery);

export default router;
