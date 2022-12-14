const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Computer = require('../models/computerModel')

// @desc Get All Orders
// @route GET /api/orders
// @access private
const getOrders = asyncHandler( async (req, res) => {
    //get the user that is currently logged in by params/BEARER token
    const loggedUser = await User.findById(req.user.id)

    //Check for loggedUser
    if(!loggedUser){
        res.status(401)
        throw new Error('User not found')
    }

    //Check that the logged user is an admin
    if(loggedUser.admin !== true){
        res.status(401)
        throw new Error('User not authorized')
    }

    const orders = await Order.find()
    res.status(200).json(orders)
})

// @desc Get UserOrders
// @route GET /api/orders/myOrders
// @access private
const getUserOrders = asyncHandler( async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json(orders)
})

// @desc Create an order into database
// @route POST /api/orders
// @access private
const createOrder = asyncHandler( async (req, res) => {
    //get the user that is currently logged in by params/BEARER token
    const loggedUser = await User.findById(req.user.id)

    //Check for loggedUser
    if(!loggedUser){
        res.status(401)
        throw new Error('User not found')
    }

    const { computer, startDate, endDate, completed } = req.body

    if (!computer || !startDate || !endDate) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const order = await Order.create({
        user: req.user.id,
        computer, 
        startDate, 
        endDate,
        completed
    })

    if (order) {
        const updatedComputer = await Computer.findByIdAndUpdate(computer, {availability:false})
        res.status(201).json({
            "order ID":order.id,
            "Computer ID":updatedComputer.id
        })
    } else {
        res.status(400)
        throw new Error('Invalid  data')
    }
})

// @desc Update order
// @route PUT /api/orders/:id
// @access private
const updateOrder = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        res.status(400)
        throw new Error('Order Not Found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged-in user matches the especific order's user
    if(order.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updatedOrder)
})

// @desc Delete order from database
// @route DELETE /api/orders/:id
// @access private
const deleteOrder = asyncHandler( async (req, res) => {
    const orderToDelete = await Order.findById(req.params.id)

    if(!orderToDelete){
        res.status(400)
        throw new Error('Computer not found')
    }

    //get the user that is currently logged in by params/BEARER token
    const loggedUser = await User.findById(req.user.id)

    //Check for loggedUser
    if(!loggedUser){
        res.status(401)
        throw new Error('User not found')
    }

    //Check that the logged user is an admin
    if(loggedUser.admin !== true){
        res.status(401)
        throw new Error('User not authorized')
    }

    //res.status(200).json({ id: req.params.id })
    
    if (orderToDelete) {
        await orderToDelete.remove()
        const updatedComputer = await Computer.findByIdAndUpdate(orderToDelete.computer, {availability:true})
        res.status(201).json({
            "order ID":orderToDelete.id,
            "Computer ID":updatedComputer.id
        })
    } else {
        res.status(400)
        throw new Error('Invalid  data')
    }
})

module.exports = {
    getOrders, 
    createOrder, 
    updateOrder, 
    deleteOrder,
    getUserOrders,
}