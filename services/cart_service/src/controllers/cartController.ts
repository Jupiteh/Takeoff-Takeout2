import { Request, Response } from 'express';
import Cart from '../models/cart';

export const getCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCartByClientId = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const cart = await Cart.findOne({ ID_Client: clientId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createOrUpdateCart = async (req: Request, res: Response) => {
  try {
    const { ID_Client, ID_Restaurant, ID_Article, ID_Menu, price } = req.body;

    let cart = await Cart.findOne({ ID_Client });

    if (cart) {
      if (cart.ID_Restaurant === ID_Restaurant) {
        // Ajouter l'article ou le menu au panier existant
        if (ID_Article) {
          cart.articles.push(ID_Article);
        }
        if (ID_Menu) {
          cart.menus.push(ID_Menu);
        }
        cart.price += price; // assuming price is the price of the new article/menu
        await cart.save();
      } else {
        // Supprimer le panier existant et en créer un nouveau
        await Cart.findOneAndDelete({ ID_Cart: cart.ID_Cart });
        cart = new Cart({
          ID_Client,
          ID_Restaurant,
          price,
          articles: ID_Article ? [ID_Article] : [],
          menus: ID_Menu ? [ID_Menu] : []
        });
        await cart.save();
      }
    } else {
      // Créer un nouveau panier
      cart = new Cart({
        ID_Client,
        ID_Restaurant,
        price,
        articles: ID_Article ? [ID_Article] : [],
        menus: ID_Menu ? [ID_Menu] : []
      });
      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOneAndDelete({ ID_Cart: id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
