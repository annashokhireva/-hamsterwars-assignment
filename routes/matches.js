const express = require('express');
const router = express.Router();

const db = require('../database.js')();

let items = [];


// GET /matches
router.get('/', async (req, res) => {
	const matchesRef = db.collection('matches');
	const snapshot = await matchesRef.get();

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
	const docRef = await db.collection('matches').doc(id).get();

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
	
	if(!objectIdentifier(object)) {
		res.sendStatus(400);
		return;
	}
	
	const docRef = await db.collection('matches').add(object);
	// res.status(200).send(`New match with id "${docRef.id}" has been added.`);
	res.status(200).send(docRef);
});


function objectIdentifier(testItem) {
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


// GET /matchWinners/:id (SKA NY OBJEKT SKAPAS?)
router.get('/matchWinners/:id', async (req, res) => {
	
});


// GET /winners
router.get('/winners', async (req, res) => {
	console.log(req.params);
});


// GET /losers
router.get('/', async (req, res) => {
	
});

module.exports = router;