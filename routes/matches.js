const express = require('express');
const router = express.Router();

const db = require('../database.js')();

let items = [];


// GET /matches
router.get('/', async (req, res) => {
	let snapshot;

	try {
		snapshot = await db.collection('matches').get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

	if (snapshot.empty) {
		res.send([]);
		return;
	}

	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});

	res.send(items);
});


// GET /matches/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	let docRef;

	try {
		docRef = await db.collection('matches').doc(id).get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

	if (!docRef.exists) {
		res.status(404).send('Match not found.');
		return;
	};

	const data = docRef.data();
	res.send(data);
});


// POST /matches ( måste alla egenskaper vara med i if-satsen?)
router.post('/', async (req, res) => {
	const object = req.body;
	
	if(!objectEvaluator(object)) {
		res.sendStatus(400);
		return;
	}
	
	// let docRef;

	// try {
	// 	docRef = await db.collection('matches').doc(id).add(object);
	// }

	// catch(error) {
	// 	console.log(error.message);
	// 	res.status(500).send(error.message);
	// }

	const docRef = await db.collection('matches').add(object);
	// res.status(200).send(`New match with id "${docRef.id}" has been added.`);
	res.send(docRef.id);
});


function objectEvaluator(testItem) {
	if(!testItem) return false;

	else if(!testItem.winnerId || !testItem.loserId) return false;
	
	return true;
};


// DELETE /matches/:id 
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = db.collection('matches').doc(id);
	const machingId = await docRef.get();

	if(!machingId.exists) {
		res.status(404).send(`Whops! Match not found.`);
		return;
	}
	
	if(machingId.exists) {
		await docRef.delete();
		res.status(200).send(`Match with id "${id}" has been deleted.`); 
	}

	else {
		res.sendStatus(400);
		return;
	}
});

module.exports = router;