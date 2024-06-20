import { Router } from 'express';
import { createMenu, getMenu, deleteMenu, updateMenu } from '../controllers/menuController';

const router = Router();

router.post('/menus', createMenu);
router.get('/menus/:restaurantId', getMenu);
router.delete('/menus/:id', deleteMenu);
router.put('/menus/:id', updateMenu);

export default router;
