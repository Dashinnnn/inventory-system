import { Request, Response } from 'express';
import { Warehouse } from '../../../models/Warehouse.js';

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;
    const newWarehouse = new Warehouse({ name, location });
    await newWarehouse.save();
    res.status(201).json(newWarehouse);
  } catch (error: any) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getWarehouses = async (_req: Request, res: Response) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (error: any) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};