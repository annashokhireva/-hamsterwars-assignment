const express = require('express');
const router = express.Router();

const db = require('../database.js')();


// GET /matchWinners/:id 
router.get('/matchWinners/:id', async (req, res) => {
	
	
});

module.exports = router;