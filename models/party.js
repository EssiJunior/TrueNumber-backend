const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid'); 

const partyShema = mongoose.Schema({
    gameId: {
        type: String,
        required: [true, 'enter the game id'],
        default: uuidv4 
    },
    date: {
        type: String,
        required: [true, 'enter your phone number'],
        default: () => new Date().toISOString()
    },
    generatedNumber: {
        type: Number,
        required: [true, 'enter the generated number']
    },
    result: {
        type: String,
        enum: ['gagné', 'perdu'],
        required: [true, 'enter the result']
    },
    balanceChange: {
        type: Number,
        required: [true, 'enter the balance change']
    },
    newBalance: {
        type: Number,
        required: [true, 'enter the new balance']
    },
    userId: {
        type: String,
        required: [true, 'enter the user id']
    }
})

module.exports = mongoose.model('parties', partyShema)