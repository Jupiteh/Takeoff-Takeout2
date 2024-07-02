import { Request, Response } from 'express';
import Menu from '../models/menu';
import MenuArticle from '../models/menuArticle';
import mongoose from 'mongoose';

export const getMenus = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { ID_Restaurant, menu_Name, price } = req.body;

    const newMenu = new Menu({ ID_Restaurant, menu_Name, price });
    const savedMenu = await newMenu.save();

    res.status(201).json(savedMenu);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { menu_Name, price } = req.body;

    const updatedMenu = await Menu.findOneAndUpdate(
      { ID_Menu: id },
      { menu_Name, price },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.find({ ID_Restaurant: restaurantId });
    if (!menu || menu.length === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findOne({ ID_Menu: id });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json(menu);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifiez que l'ID est un entier valide
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({ error: 'Invalid menu ID' });
    }

    // Supprimer les articles associés au menu
    await MenuArticle.deleteMany({ ID_Menu: id });

    // Supprimer le menu
    const menu = await Menu.findOneAndDelete({ ID_Menu: id });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json({ message: 'Menu and associated articles deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};