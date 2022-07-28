const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    teamID: {
        type: Number,
        required: [true, 'Please add an team ID'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please add a team name']
    },
    members: {
        type: Array,
        required: [true, 'Please add a members array']
    },
    first: {
        type: Array,
        required: [true, 'Please add a second place array']
    },
    second: {
        type: Array,
        required: [true, 'Please add a second place array']
    },
    third: {
        type: Array,
        required: [true, 'Please add a third place array']
    },
    fourth: {
        type: Array,
        required: [true, 'Please add a fourth place array']
    },
    noPoints: {
        type: Array,
        required: [true, 'Please add a noPoints array']
    },
    currentPlace: {
        type: Number,
        required: [true, 'Please add the current place of the team']
    },
    currentPoints: {
        type: Number,
        required: [true, 'Please add the current points of the team']
    },
},
{
    timestamps: true
})


module.exports = mongoose.model('Team', teamSchema)