import { Router } from 'express';
import { getMenus, getMenuById, createMenu, getMenuByRestaurant, deleteMenu, updateMenu } from '../controllers/menuController';

const router = Router();

router.post('/menus', createMenu);
router.get('/menus', getMenus);
router.get('/menus/:id', getMenuById);
router.get('/menusbyRestaurant/:restaurantId', getMenuByRestaurant);
router.delete('/menus/:id', deleteMenu);
router.put('/menus/:id', updateMenu);

export default router;
