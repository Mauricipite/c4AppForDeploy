const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please add a name']
    },
    email:{
        type:String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'Please add a password']
    },
    phoneNumber:{
        type:Number,
        required: [true, 'Please add a phone number']
    },
    identification:{
        type:Number,
        required: [true, 'Please add an ID'],
        unique: true
    },
    address:{
        type:String,
        required: [true, 'Please add an ID']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)