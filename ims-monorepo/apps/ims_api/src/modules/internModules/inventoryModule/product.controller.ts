import { Request, Response } from 'express';
import { Product } from '../../../models/Products.js';
import { Warehouse } from '../../../models/Warehouse.js';

/**
 * @desc    Create a new product linked to a warehouse
 * @route   POST /api/inventory/products
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, sku, warehouseId, quantity, description } = req.body;

    if (!sku) {
      return res.status(400).json({ message: "SKU is required" });
    }
    const existingProduct = await Product.findOne({ sku: sku.toUpperCase() });
    if (existingProduct) {
      return res.status(400).json({ 
        message: "Product with this SKU already exists" 
      });
    }

    const warehouseExists = await Warehouse.findById(warehouseId);
    if (!warehouseExists) {
      return res.status(404).json({ 
        message: "Selected Warehouse does not exist. Please create a warehouse first." 
      });
    }

    const newProduct = new Product({
      name,
      sku: sku.toUpperCase(),
      description,
      quantity: quantity || 0,
      warehouse: warehouseId 
    });

    const savedProduct = await newProduct.save();

    const populatedProduct = await savedProduct.populate('warehouse');
    
    res.status(201).json(populatedProduct);

  } catch (error: any) {
    res.status(500).json({ 
      message: "Server Error during product creation", 
      error: error.message 
    });
  }
};

/**
 * @desc    Get all active products with warehouse details
 * @route   GET /api/inventory/products
 */
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('warehouse');
    console.log("Total products in DB: ", products.length);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Server Error while fetching products", 
      error: error.message 
    });
  }
};