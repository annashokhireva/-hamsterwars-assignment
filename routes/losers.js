const express = require('express');
const router = express.Router();

const db = require('../database.js')();

// GET /losers
router.get('/', async (req, res) => {
	let result;

	try {
		result = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get();
		
		const rows = [];

		result.forEach(doc => {
			rows.push(doc.data());
		});

		res.send(rows);
	}
	
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

});

module.exports = router;