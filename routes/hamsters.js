const express = require('express');
const router = express.Router();

const db = require('../database.js')();

let items = [];


// GET /hamsters
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters');
	const snapshot = await hamstersRef.get();

	if (snapshot.empty) {
		res.send([]);
		return;
	}

	// let items = [];
	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});

	res.send(items);
});


// GET /hamsters/random

// router.get('/random', async (req, res) => {
// 	const randomRef = db.collection('hamsters');
// 	const random = await randomRef.get();
	
// 	items.forEach(doc => {
// 		const data = doc.data();
// 		data.id = doc.id;
// 		randomData = Math.floor(Math.random() * data.length);
// 		items.push(randomData); 
// 	});

// 	res.send(items);
// });


// GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();

	if (!docRef.exists) {
		res.status(404).send('Whops! Hamster not found.');
		return;
	};

	const data = docRef.data();
	res.send(data);
});


// POST /hamsters ( måste alla egenskaper vara med i if-satsen?)
router.post('/', async (req, res) => {
	const object = req.body;
	
	if(!objectIdentifier(object)) {
		res.sendStatus(400);
		return;
	}
	
	const docRef = await db.collection('hamsters').add(object);
	res.status(200).send(`Hamster with id "${docRef.id}" has been added.`);
});


function objectIdentifier(testItem) {
	if(!testItem) return false;

	else if(!testItem.name || !testItem.age || !testItem.imgName) return false;
	
	return true;
};


// PUT /hamsters/:id (400?)
router.put('/:id', async (req, res) => {
	const object = req.body;
	const id = req.params.id;

	if(!object) {
		res.sendStatus(400);
		return;
	}

	else if(!id) {
		res.status(404).send(`Whops! Hamster with id "${id}" not found.`);
		return;
	}

	const docRef = db.collection('hamsters').doc(id);
	await docRef.set(object, { merge: true });
	res.status(200).send(`Information has been edited`);

});


// DELETE /hamsters/:id  (add code 400)
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = db.collection('hamsters').doc(id);
	const matchId = await docRef.get();

	if(!matchId.exists) {
		res.status(404).send(`Whops! Hamster with id "${id}" not found.`);
		return;
	}	

	await docRef.delete();
	res.status(200).send(`Hamster with id "${id}" has been deleted.`); 

})



module.exports = router;