const mongoose = require('mongoose')

const usersShema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'enter your username']
    },
    phoneNumber: {
        type: String,
        required: [true, 'enter your phone number']
    },
    email: {
        type: String,
        required: [true, 'enter your email']
    },
    password: {
        type: String,
        required: [true, 'enter your password']
    },
    balance: {
        type: Number,
        required: [true, 'enter your balance'],
        default: 0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: [true, 'enter your role'],
        default: 'user'
    }
})

module.exports = mongoose.model('users', usersShema)