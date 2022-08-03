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
        type: String,
        required: [true, 'Please add a start time']
    },
    day: {
        type: String,
        required: [true, 'Please add a day']
    },
    eventType: {
        type: String,
        required: [true, 'Please add an event tpye']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    divisions: {
        type: Array,
        required: [true, 'Please add a divison array']
    },
    eventLink: {
        type: String,
        required: [true, 'Please add a link name']
    }
},
{
    timestamps: true
})


module.exports = mongoose.model('Event', eventSchema)