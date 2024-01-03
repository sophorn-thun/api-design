import {Router} from 'express'
import { body, oneOf } from "express-validator";
import { handleInputError } from './modules/middleware';

const router = Router()

// Product
router.get('/product', (req, res) => {
    res.json({message: 'product'})
})
router.get('/product/:id', () => {})
router.post('/product', body('name').isString(), handleInputError, (req, res) => {})
router.put('/product/:id', body('name').isString(), handleInputError, (req, res) => {

})
router.delete('/product/:id', () => {})

// Update
router.get('/update', () => {})
router.post('/update', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    () => {})
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), 
    () => {})
router.delete('/update/:id', () => {})

// Updatepoint
router.get('/updatepoint', () => {})
router.post('/updatepoint', 
    body('name').isString(), 
    body('description').isString(),
    body('updateId').exists().isString(),
    () => {})
router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    () => {})
router.delete('/updatepoint/:id', () => {})

export default router;