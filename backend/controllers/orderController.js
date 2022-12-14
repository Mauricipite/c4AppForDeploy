const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Computer = require('../models/computerModel')

// @desc Get Orders
// @route GET /api/orders
// @access private
const getOrders = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the READ method'})
})

// @desc Create an order into database
// @route POST /api/orders
// @access private
const createOrder = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the POST method'})
})

// @desc Update order
// @route PUT /api/orders/:id
// @access private
const updateOrder = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the UPDATE method'})
})

// @desc Delete order from database
// @route DELETE /api/orders/:id
// @access private
const deleteOrder = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the DELETE method'})
})

module.exports = {
    getOrders, 
    createOrder, 
    updateOrder, 
    deleteOrder,
}