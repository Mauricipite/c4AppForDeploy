const express = require('express')
const router = express.Router()
const { 
    getOrders, 
    createOrder, 
    updateOrder, 
    deleteOrder,
    getUserOrders,
} = require('../controllers/orderController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getOrders)
router.get('/myOrders', protect, getUserOrders)

router.post('/', protect, createOrder)

router.put('/:id', protect, updateOrder)

router.delete('/:id', protect, deleteOrder)

module.exports = router