const express = require('express');
const router = express.Router();

const db = require('../database.js')();

// GET /winners
router.get('/winners', async (req, res) => {
	console.log(req.params);
});

module.exports = router;