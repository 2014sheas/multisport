const asyncHandler = require('express-async-handler');

const Event = require('../models/eventModel');


// @desc    Get events
// @route   GET /api/events
// @access  PRIVATE
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();

    res.status(200).json(events);
});


module.exports = {
    getEvents,
};