const asyncHandler = require('express-async-handler');

const Team = require('../models/teamModel');


// @desc    Get teams
// @route   GET /api/teams
// @access  PRIVATE
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();

    res.status(200).json(teams);
});

// @desc    Update team
// @route   POST /api/teams/:id
// @access  PRIVATE
const updateTeam = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);

    console.log(req.params)
    if(!team) {
        res.status(400);
        throw new Error('Team not found');
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