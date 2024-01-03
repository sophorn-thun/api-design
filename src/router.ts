import {Router} from 'express'
import { body } from "express-validator";
import { handleInputError } from './modules/middleware';

const router = Router()

router.get('/product', (req, res) => {
    res.json({message: 'product'})
})
router.get('/product/:id', () => {})
router.post('/product', body('name').isString(), handleInputError, (req, res) => {})
router.put('/product/:id', body('name').isString(), handleInputError, (req, res) => {

})
router.delete('/product/:id', () => {})

router.get('/update', () => {})
router.post('/update', () => {})
router.put('/update/:id', () => {})
router.delete('/update/:id', () => {})

router.get('/updatepoint', () => {})
router.post('/updatepoint', () => {})
router.put('/updatepoint/:id', () => {})
router.delete('/updatepoint/:id', () => {})

export default router;