import { Request, Response } from 'express';
import Article from '../models/article';
import MenuArticle from '../models/menuArticle';
import fs from 'fs';
import path from 'path';

export const createArticle = async (req: Request, res: Response) => {
  try {
    const newArticle = req.body;

    if (req.file) {
      newArticle.image = req.file.path;
    }

    const article = new Article(newArticle);
    await article.save();
    res.status(201).json(article);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findOne({ ID_Article: id });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (req.file && article.image) {
      const oldImagePath = path.join(__dirname, '..', article.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updates.image = req.file.path;
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedArticle);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.image) {
      const imagePath = path.join(__dirname, '..', article.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createMenuArticle = async (req: Request, res: Response) => {
  try {
    const { ID_Menu, ID_Article } = req.body;
    const menuArticle = new MenuArticle({ ID_Menu, ID_Article });
    await menuArticle.save();
    res.status(201).json(menuArticle);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
