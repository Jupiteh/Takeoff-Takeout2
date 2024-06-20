import { Request, Response } from 'express';
import MenuArticle from '../models/menuArticle';
import Article from '../models/article';

// Fonction pour obtenir tous les articles de menu
export const getAllMenuArticles = async (req: Request, res: Response) => {
    try {
      const menuArticles = await MenuArticle.find();
      res.status(200).json(menuArticles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

export const getArticlesByMenu = async (req: Request, res: Response) => {
    try {
      const { menuId } = req.params;
      const menuArticles = await MenuArticle.find({ ID_Menu: menuId });
      const articleIds = menuArticles.map(ma => ma.ID_Article);
      const articles = await Article.find({ ID_Article: { $in: articleIds } });
  
      res.status(200).json(articles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

export const addArticleToMenu = async (req: Request, res: Response) => {
  try {
    const { ID_Menu, ID_Article } = req.body;

    const menuArticle = new MenuArticle({ ID_Menu, ID_Article });
    await menuArticle.save();

    res.status(201).json(menuArticle);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeArticleFromMenu = async (req: Request, res: Response) => {
    try {
      const { menuId, articleId } = req.params;
      const menuArticle = await MenuArticle.findOneAndDelete({ ID_Menu: menuId, ID_Article: articleId });
  
      if (!menuArticle) {
        return res.status(404).json({ error: 'Article not found in menu' });
      }
  
      res.status(200).json({ message: 'Article removed from menu successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };