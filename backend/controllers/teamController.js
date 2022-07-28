const asyncHandler = require('express-async-handler');

const Team = require('../models/teamModel');


// @desc    Get events
// @route   GET /api/events
// @access  PRIVATE
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();

    res.status(200).json(teams);
});


module.exports = {
    getTeams,
};