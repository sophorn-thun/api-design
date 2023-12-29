import {Router} from 'express'

const router = Router()

router.get('/product', (req, res) => {
    res.json({message: 'product'})
})
router.get('/product/:id', () => {})
router.post('/product', () => {})
router.put('/product/:id', () => {})
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