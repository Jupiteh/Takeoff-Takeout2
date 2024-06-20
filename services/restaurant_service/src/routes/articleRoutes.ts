import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createArticle, getArticles, updateArticle, deleteArticle, createMenuArticle, getArticleById } from '../controllers/articleController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/article/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/articles', upload.single('image'), createArticle);
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', upload.single('image'), updateArticle);
router.delete('/articles/:id', deleteArticle);
router.post('/menu-articles', createMenuArticle);

export default router;
