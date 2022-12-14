const asyncHandler = require('express-async-handler')

const Computer = require('../models/computerModel')
const User = require('../models/userModel')

// @desc Get Computers
// @route GET /api/computers
// @access admins?
const getComputers = asyncHandler( async (req, res) => {
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

    const computers = await Computer.find()
    res.status(200).json(computers)
})

// @desc Get Computers Inventory/Only Avaliables
// @route GET /api/computers/inventory
// @access users
const getAvailableComputers = asyncHandler( async (req, res) => {
    //get the user that is currently logged in by params/BEARER token
    const loggedUser = await User.findById(req.user.id)

    //Check for loggedUser
    if(!loggedUser){
        res.status(401)
        throw new Error('User not found')
    }

    const computers = await Computer.find({availability: true})
    res.status(200).json(computers)
})

// @desc Insert Computers into database
// @route POST /api/computers
// @access admins
const insertComputers = asyncHandler( async (req, res) => {
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

    const { inventoryCode, description, cpu, ram, storage, availability, category} = req.body

    if(!inventoryCode || !description || !cpu || !ram || !storage || !category){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const computerToCreate = await Computer.create({
        inventoryCode,
        description,
        cpu,
        ram,
        storage,
        availability,
        category
    })

    if (computerToCreate) {
        res.status(201).json({
            _id: computerToCreate.id,
        })
    } else {
        res.status(400)
        throw new Error('Invalid computer data')
    }
})

// @desc Update Computers
// @route PUT /api/computers/:id
// @access admins?
const updateComputer = asyncHandler( async (req, res) => {
    const computerToUpdate = await Computer.findById(req.params.id)

    if(!computerToUpdate){
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

    const updatedComputer = await Computer.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updatedComputer)
})

// @desc Delete Computers from database
// @route DELETE /api/computers/:id
// @access admins?
const deleteComputer = asyncHandler( async (req, res) => {
    const computerToDelete = await Computer.findById(req.params.id)

    if(!computerToDelete){
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

    await computerToDelete.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getComputers, 
    insertComputers, 
    updateComputer, 
    deleteComputer,
    getAvailableComputers,
}