const express = require('express');
const router = express.Router();
const { getEvents, updateEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.put('/:id', updateEvent);




module.exports = router;
