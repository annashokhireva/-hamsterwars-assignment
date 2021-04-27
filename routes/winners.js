const express = require('express');
const { doSomething } = require('../utils/utils.js');
const router = express.Router();

const db = require('../database.js')();

// GET /winners
router.get('/', async (req, res) => {

	try {
		const result = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();
		const rows = [];

		result.forEach(doc => {
			rows.push(doc.data());
		});

		doSomething();

		res.send(rows);
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
	
	
	// let snapshot;

	// try {
	// 	snapshot = await db.collection('hamsters').get();
	// }

	// catch(error) {
	// 	console.log(error.message);
	// 	res.status(500).send(error.message);
	// }

	// if (snapshot.empty) {
	// 	res.sendStatus(400);
	// 	return;
	// }

	// let items = [];

	// snapshot.forEach(doc => {
	// 	const data = doc.data();
	// 	data.id = doc.id;
	// 	items.push(data);
	// 	let topFive = data.wins.sort((a,b) => b-a).slice(0,5);
	// 	console.log(topFive);
	// });

	// res.send(items);

});

module.exports = router;