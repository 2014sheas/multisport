const asyncHandler = require('express-async-handler');

const Game = require('../models/gameModel');





// @desc    Get games
// @route   GET /api/football
// @access  PRIVATE
const getGames = asyncHandler(async (req, res) => {
    const games = await Game.find();
    

    res.status(200).json(games);
});


module.exports = {
    getGames,
};