const express = require('express');
const router = express.Router();

const db = require('../database.js')();


// GET /matchWinners/:id (SKA NY OBJEKT SKAPAS?)
router.get('/matchWinners/:id', async (req, res) => {
	
});

module.exports = router;