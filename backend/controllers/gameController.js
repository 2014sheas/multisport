const asyncHandler = require('express-async-handler');

const Game = require('../models/gameModel');



// @desc    Create game
// @route   POST /api/game
// @access  PRIVATE
const createGame = asyncHandler(async (req, res) => {



    const game = await Game.create({
        gameID: req.body.gameID,
        event: req.body.event,
        special: req.body.special,
        status: req.body.status,
        home: req.body.home,
        away: req.body.away,
        homeScore: req.body.homeScore,
        awayScore: req.body.awayScore,
        winner: req.body.winner,
        loser: req.body.loser,
        
    })
    res.status(200).json(game);
});

// @desc    Get games
// @route   GET /api/football
// @access  PRIVATE
const getGames = asyncHandler(async (req, res) => {
    const games = await Game.find();
    
    res.status(200).json(games);
});

// @desc    Update game
// @route   PUT /api/games/:id
// @access  PRIVATE
const updateGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    console.log(req.params)
    if(!game) {
        res.status(400);
        throw new Error('Game not found');
    }

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedGame);
}) ;

// @desc    Delete game
// @route   POST /api/games/:id
// @access  PRIVATE
const deleteGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if(!game) {
        res.status(400);
        throw new Error('Game not found');
    }

   await game.remove();

    res.status(200).json({ id: req.params.id });
});


module.exports = {
    createGame,
    getGames,
    updateGame,
    deleteGame,

};