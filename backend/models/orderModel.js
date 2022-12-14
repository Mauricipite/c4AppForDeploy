const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    computer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Computer'
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start-date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end-date']
    },
    completed:{
        type:Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)

// user, computer, startDate, endDate, completed