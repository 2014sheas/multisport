const express = require('express');
const router = express.Router();
const { getTeams, updateTeam } = require('../controllers/teamController');


router.get('/', getTeams);

router.put('/:id', updateTeam)



module.exports = router;
