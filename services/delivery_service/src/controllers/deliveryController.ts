import { Request, Response } from 'express';
import Delivery from '../models/delivery';

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const newDelivery = req.body;
    const delivery = new Delivery(newDelivery);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getDeliveryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findOne({ ID_Delivery: id });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.status(200).json(delivery);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedDelivery = await Delivery.findOneAndUpdate({ ID_Delivery: id }, updates, { new: true });
    res.status(200).json(updatedDelivery);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDelivery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findOneAndDelete({ ID_Delivery: id });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.status(200).json({ message: 'Delivery deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
