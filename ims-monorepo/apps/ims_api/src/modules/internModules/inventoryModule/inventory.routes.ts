import { Router } from 'express';
import { createProduct, getProducts } from './product.controller.js';
import { createWarehouse, getWarehouses } from './warehouse.controller.js';
import { createSupplier, getSuppliers } from './supplier.controller.js';
import { createOrder, getOrders } from './order.controller.js';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProducts);

router.post('/warehouses', createWarehouse);
router.get('/warehouses', getWarehouses);

router.post('/suppliers', createSupplier);
router.get('/suppliers', getSuppliers);

router.post('/orders', createOrder);
router.get('/orders', getOrders);

export default router;