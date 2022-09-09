const asyncHandler = require('express-async-handler');

const Event = require('../models/eventModel');


// @desc    Get events
// @route   GET /api/events
// @access  PRIVATE
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();

    res.status(200).json(events);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  PRIVATE
const updateEvent = asyncHandler(async (req, res) => {

    const event = await Event.findById(req.params.id);


    if(!event) {
        res.status(400);
        throw new Error('Event not found');
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedEvent);
});

module.exports = {
    getEvents,
    updateEvent
};