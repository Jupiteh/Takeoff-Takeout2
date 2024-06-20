import { Request, Response } from 'express';
import Order from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const order = new Order(newOrder);
    await order.save();
    res.status(201).json(order);
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

export const getConfirmedOrdersByRestaurants = async (req: Request, res: Response) => {
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
    const { restaurantIds } = req.params;
    const restaurantIdArray = restaurantIds.split(',').map(Number);
    const orders = await Order.find({
      ID_Restaurant: { $in: restaurantIdArray },
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
