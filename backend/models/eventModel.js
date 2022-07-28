const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    fullpoints: {
        type: Boolean,
        required: [true, 'Please specify whether the event is worth full points']
    },
    results: {
        type: Array,
        required: [true, 'Please add a results array']
    },
    status: {
        type: String,
        required: [true, 'Please add a status']
    },
    eventID: {
        type: Number,
        required: [true, 'Please add an event ID'],
        unique: true
    },
    startTime: {
        type: Date,
        required: [true, 'Please add a start time']
    },
    eventType: {
        type: String,
        required: [true, 'Pleas add an event tpye']
    },
},
{
    timestamps: true
})


module.exports = mongoose.model('Event', eventSchema)