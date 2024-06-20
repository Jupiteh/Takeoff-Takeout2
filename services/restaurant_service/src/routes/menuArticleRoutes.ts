import { Router } from 'express';
import { addArticleToMenu, getArticlesByMenu, removeArticleFromMenu, getAllMenuArticles } from '../controllers/menuArticleController';

const router = Router();

router.get('/menuArticles', getAllMenuArticles);
router.post('/menuArticles', addArticleToMenu);
router.get('/menuArticles/:menuId', getArticlesByMenu);
router.delete('/menuArticles/:menuId/:articleId', removeArticleFromMenu);

export default router;
