import { Router } from 'express';
import { createProduct, getProducts } from './product.controller.js';
import { createWarehouse, getWarehouses } from './warehouse.controller.js';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProducts);

router.post('/warehouses', createWarehouse);
router.get('/warehouses', getWarehouses);

export default router;