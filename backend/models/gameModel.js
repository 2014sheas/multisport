const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    gameID: {
        type: Number,
        required: true,
    },
    event: {
        type: String,
        required: [true, 'Please add an event name']
    },
    special: {
        type: String,
        required: [false]
    },
    status: {
        type: String,
        required: [false]
    },
    home: {
        type: Number,
        required: [true, 'Please add an away name']
    },
    away: {
        type: Number,
        required: [true, 'Please add a home team']
    },
    homeScore: {
        type: Number,
        required: [false]
    },
    awayScore: {
        type: Number,
        required: [false]
    },
    winner: {
        type: Number,
        required: [false]
    },
    loser: {
        type: Number,
        required: [false]
    },
},
{
    timestamps: true
})


module.exports = mongoose.model('Game', gameSchema)