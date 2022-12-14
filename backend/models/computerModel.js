const mongoose = require('mongoose')

const computerSchema = mongoose.Schema({
    inventoryCode:{
        type:Number,
        required: [true, 'Please add a code'],
        unique: true
    },
    description:{
        type:String,
        required: [true, 'Please add a description']
    },
    cpu:{
        type:String,
        required: [true, 'Please add a cpu']
    },
    ram:{
        type:String,
        required: [true, 'Please add RAM info']
    },
    storage:{
        type:String,
        required: [true, 'Please add Storage type and amount']
    },
    availability:{
        type:Boolean,
        default: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Computer', computerSchema)