const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    gameID: {
        type: Number,
        required: true,
    }
},
{
    timestamps: true
})


module.exports = mongoose.model('Game', gameSchema)