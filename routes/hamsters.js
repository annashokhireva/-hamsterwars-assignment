const express = require('express');
const router = express.Router();

const db = require('../database.js')();

let items = [];

// GET /hamsters
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters');
	const snapshot = await hamstersRef.get();

	if (snapshot.empty) {
		res.sendStatus(400);
		return;
	}

	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});

	res.send(items);
});


// GET /hamsters/random

router.get('/random', async (req, res) => {
	const randomRef = db.collection('hamsters');
	const random = await randomRef.get();
	
	if (random.empty) {
		res.send([]);
		return;
	}

	let randomData;

	random.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
		randomData = items[Math.floor(Math.random() * items.length)];
	});

	res.send(randomData);

});


// GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();

	if (!docRef.exists) {
		res.status(404).send('Whops! Hamster not found.');
		return;
	};

	const data = docRef.data();
	res.status(200).send(data);
});


// POST /hamsters (CHECK IF HAMSTER EXISTS)
router.post('/', async (req, res) => {
	const object = req.body;

	// const empty = {};

	// if(Object.keys(empty).length === 0 && empty.constructor === Object) {
	// 	res.sendStatus(400);
	// 	return;
	// }

	// const snapshot = await db.collection('hamsters').get();
	// let hamsterObj = {}

	// for (let i = 0; i < snapshot.length; index++) {
	// 	const element = snapshot[i];
		
	// 	element = hamsterObj;
	// }

	if(!objectEvaluator(object)) {
		res.sendStatus(400);
		return;
	}
	
	const docRef = await db.collection('hamsters').add(object);

	// res.status(200).send(`Hamster with id "${docRef.id}" has been added.`);
	res.status(200).send(docRef.id);

});


function objectEvaluator(testItem) {

	if( testItem && ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games'].every(t => testItem.hasOwnProperty(t)) ) {
		return true;
	}

	if( testItem.id )
		return true

	return false;

	// if (!testItem) return false;
	
	// if( testItem.name && testItem.age && testItem.favFood && testItem.loves && testItem.imgName && testItem.wins >= 0 && testItem.defeats >= 0 && testItem.games >=0 ) {

	// 	if(testItem.age <= 0 || !Number.isInteger(testItem.age)){
	// 		return false;
	// 		// humster must be at least 1 year old in order to partisipate
	// 	}

	// 	return true;
	// } 


	// return true;

};

// function getChanges(oldArray, newArray) {
// 	var changes, i, item, j, len;
// 	if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
// 	  return false;
// 	}
// 	changes = [];
// 	for (i = j = 0, len = newArray.length; j < len; i = ++j) {
// 	  item = newArray[i];
// 	  if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
// 		changes.push(item);
// 	  }
// 	}
// 	return changes;
//   };


// PUT /hamsters/:id (Ett objekt med ändringar: { wins: 10, games: 12 })
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const object = req.body;
	const docRef = db.collection('hamsters').doc(id)
	const hamsterRef = await docRef.get();

	if(!hamsterRef.exists) {
		res.status(404).send(`Whops! Hamster not found.`);
		return;
	}


	if(!object || !object.length ) {
		res.sendStatus(400);
		return;
	}

	await docRef.set(object, { merge: true });
	// res.status(200).send(`Information has been edited`);
	res.sendStatus(200);

});


// DELETE /hamsters/:id 
router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	if(!id) {
		res.sendStatus(400);
		return;
	}

	const docRef = await db.collection('hamsters').doc(id).get();


	if(!docRef.exists) {
		// res.status(404).send(`Whops! Hamster not found.`);
		res.sendStatus(404);
		return;
	}
	
	// if(machingId.exists) {
	// 	await docRef.delete();
	// 	// res.status(200).send(`Hamster with id "${id}" has been deleted.`); 
	// 	res.sendStatus(200);
	// }

	// else {
	// 	res.sendStatus(400);
	// 	return;
	// }

	await db.collection('hamsters').doc(id).delete()
	res.sendStatus(200);
});


module.exports = router;