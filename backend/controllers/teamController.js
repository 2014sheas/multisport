const asyncHandler = require('express-async-handler');

const Team = require('../models/teamModel');


// @desc    Get events
// @route   GET /api/events
// @access  PRIVATE
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();

    res.status(200).json(teams);
});

// @desc    Update goal
// @route   POST /api/goals/:id
// @access  PRIVATE
const updateTeam = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);

    console.log(req.params)
    if(!team) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedTeam);
}) ;


module.exports = {
    getTeams,
    updateTeam,
};