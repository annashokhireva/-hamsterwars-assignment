const getDatabase = require('../database');
const db = getDatabase();

const express = require('express');
const router = express.Router();


// GET /hamsters
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters');
	const snapshot = await hamstersRef.get();

	if (snapshot.empty) {
		res.send([]);
		return;
	}

	let items = [];
	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
		
	});

	res.send(items);
});

// GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();


	if (!docRef.exists) {
		res.status(404).send('Hamster does not exist');
		return;
	};

	const data = doc.docRef.data();
	res.send(data);
})