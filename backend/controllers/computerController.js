const asyncHandler = require('express-async-handler')
const Computer = require('../models/computerModel')

// @desc Get Computers
// @route GET /api/computers
// @access admins?
const getComputers = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the READ method'})
})

// @desc Insert Computers into database
// @route POST /api/computers
// @access admins?
const insertComputers = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the POST method'})
})

// @desc Update Computers
// @route PUT /api/computers/:id
// @access admins?
const updateComputer = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the UPDATE method'})
})

// @desc Delete Computers from database
// @route DELETE /api/computers/:id
// @access admins?
const deleteComputer = asyncHandler( async (req, res) => {
    res.status(200).json({Message: 'Entering the DELETE method'})
})

module.exports = {
    getComputers, 
    insertComputers, 
    updateComputer, 
    deleteComputer,
}