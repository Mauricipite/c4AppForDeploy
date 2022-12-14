const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register users
// @route POST /api/users
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, phoneNumber, identification, address, admin } = req.body

    if (!name || !email || !password || !phoneNumber || !identification || !address) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        phoneNumber,
        identification,
        address,
        password:hashedPassword,
        admin
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc Authenticate a user
// @route POST /api/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    //Check for user by email
    const user = await User.findOne({email})

    //If found, check for email, hashed on DB and unhashed passwords on form
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({message: 'Login user'})
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler( async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// @desc Update a user
// @route PUT /api/login/:id
// @access Private - only user itself and admins can do it
const updateUser = asyncHandler(async (req, res) => {
    
    //locate user to update by req on params/query
    const userToUpdate = await User.findById(req.params.id)

    //validate that we got a user
    if(!userToUpdate){
        res.status(400)
        throw new Error('User not found')
    }

    //get the user that is currently logged in by params/BEARER token
    const loggedUser = await User.findById(req.user.id)

    //Check for loggedUser
    if(!loggedUser){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure that only logged-in user can update itself, or that an admin can do it
    if(userToUpdate.id == loggedUser.id || loggedUser.admin == true){
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(updatedUser)
    }
})

// @desc Delete a user
// @route DELETE /api/login/:id
// @access Private/Admins only
const deleteUser = asyncHandler(async (req, res) => {
    //locate user to delete by req on params/query
    const userToDelete = await User.findById(req.params.id)

    //validate that we got a user
    if(!userToDelete){
        res.status(400)
        throw new Error('User not found')
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

    //if, and only if it is an admin, then...
    await userToDelete.remove()

    res.status(200).json({ id: req.params.id })
})


//Generate a JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '90d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
}