import {Router} from 'express'
import { body } from "express-validator";
import { handleInputError } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { createUpdatePoint, deleteUpdatePoint, getOneUpdatePoint, getUpdatePoints, updateUpdatePoint } from './handlers/updatePoint';

const router = Router()

// Product
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.post('/product', body('name').isString(), handleInputError, createProduct)
router.put('/product/:id', body('name').isString(), handleInputError, updateProduct)
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.post('/update', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), 
    updateUpdate)
router.delete('/update/:id', deleteUpdate)

// Updatepoint
router.get('/updatepoint', getUpdatePoints)
router.get('/updatepoint/:id', getOneUpdatePoint)
router.post('/updatepoint', 
    body('name').isString(), 
    body('description').isString(),
    body('updateId').exists().isString(),
    createUpdatePoint)
router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    updateUpdatePoint)
router.delete('/updatepoint/:id', deleteUpdatePoint)

export default router;