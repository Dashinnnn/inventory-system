import { Request, Response } from 'express';
import { Order } from '../../../models/Order.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { 
      orderId, 
      supplier, 
      orderedBy, 
      orderDate, 
      expectedDeliveryDate, 
      totalItems, 
      totalCost, 
      status 
    } = req.body;

    // Check if Order ID is unique
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ message: "Order ID already exists" });
    }

    const newOrder = new Order({
      orderId,
      supplier,
      orderedBy,
      orderDate,
      expectedDeliveryDate,
      totalItems,
      totalCost,
      status
    });

    await newOrder.save();
    const populatedOrder = await newOrder.populate('supplier');

    res.status(201).json(populatedOrder);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('supplier') // This brings in the Supplier details
      .sort({ createdAt: -1 }); // Shows the newest orders first

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};