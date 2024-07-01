import { Request, Response } from 'express';
import Order from '../models/order';
import crypto from 'crypto';

// Fonction pour récupérer la clé de chiffrement et l'IV à partir des variables d'environnement
const getCryptoKeyAndIv = () => {
  const key = process.env.CRYPTO_KEY || '';
  const iv = process.env.CRYPTO_IV || '';

  if (key.length !== 32) {
    throw new Error("CRYPTO_KEY must be 32 characters long");
  }
  if (iv.length !== 16) {
    throw new Error("CRYPTO_IV must be 16 characters long");
  }

  return { key: Buffer.from(key), iv: Buffer.from(iv) };
};

// Fonction pour crypter le validation_Code
const encryptValidationCode = (code: string): string => {
  const { key, iv } = getCryptoKeyAndIv();
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(code, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Fonction pour décrypter le validation_Code
const decryptValidationCode = (encryptedCode: string): string => {
  const { key, iv } = getCryptoKeyAndIv();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedCode, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const validationCode = (Math.floor(Math.random() * 90) + 10).toString(); // Générer un nombre aléatoire à 2 chiffres
    newOrder.validation_Code = encryptValidationCode(validationCode);
    const order = new Order(newOrder);
    await order.save();
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const checkValidationCode = async (req: Request, res: Response) => {
  try {
    const { orderId, code } = req.body;

    const order = await Order.findOne({ ID_Order: orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const decryptedCode = decryptValidationCode(order.validation_Code);
    const isValid = decryptedCode === code;

    res.status(200).json({ isValid });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getDecryptedValidationCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ ID_Order: id });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const decryptedCode = decryptValidationCode(order.validation_Code);
    res.status(200).json({ validation_Code: decryptedCode });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};







export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getConfirmedOrdersByClients = async (req: Request, res: Response) => {
  try {
    const { restaurantIds } = req.params;
    const restaurantIdArray = restaurantIds.split(',').map(Number);
    const orders = await Order.find({
      ID_Restaurant: { $in: restaurantIdArray },
      state: { $in: ['order confirmed', 'order accepted by restaurant'] }
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAcceptedOrdersByRestaurants = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      state: 'order accepted by restaurant'
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const getAcceptedOrdersByDeliveryMan = async (req: Request, res: Response) => {
  try {
    const { deliveryManId } = req.params;
    const orders = await Order.find({ state: 'order delivery accepted', ID_DeliveryMan: Number(deliveryManId) });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedOrder = await Order.findOneAndUpdate({ ID_Order: id }, updates, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndDelete({ ID_Order: id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};