const express = require('express');
const router = express.Router();

const db = require('../database.js')();

// GET /winners
router.get('/', async (req, res) => {
	let result;

	try {
		result = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();

		const rows = [];

		result.forEach(doc => {
			// const data = doc.data();
			// data.id = doc.id;
			// rows.push(data);
			//console.log(data.wins);

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