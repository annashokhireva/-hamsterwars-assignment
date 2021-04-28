const express = require('express');
const router = express.Router();

const db = require('../database.js')();


// GET /matchWinners/:id 
router.get('/:id', async (req, res) => {
	let snapshot;
	const id = req.params.id;
	// let winnerRef;

	try {
		snapshot = await db.collection('matches').where('winnerId', '==', `${id}`).get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}

	if (snapshot.empty) {
		res.sendStatus(404);
		return;
	}

	const rows = [];

	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;

		rows.push(data);
		
		
	});

	// winnerRef = await db.collection('hamsters').doc(id).get();
	// const winner = winnerRef.data();

	// console.log(winner);
	console.log('row count', rows.length, id);

	res.send(rows);
	
});


module.exports = router;