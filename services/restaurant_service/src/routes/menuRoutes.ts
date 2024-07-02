import { Router } from 'express';
import { getMenus, getMenuById, createMenu, getMenu, deleteMenu, updateMenu } from '../controllers/menuController';

const router = Router();

router.post('/menus', createMenu);
router.get('/menus', getMenus);
router.get('/menusid/:id', getMenuById);
router.get('/menus/:restaurantId', getMenu);
router.delete('/menus/:id', deleteMenu);
router.put('/menus/:id', updateMenu);

export default router;
