const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');

const PORT = process.env.PORT || 1204;
const frontendFolder = path.join(__dirname, 'public');
const imgFolder = path.join(__dirname, 'img');

//Middleware
app.use(cors());
app.use(express.json());

app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use(express.static(frontendFolder));
app.use(express.static(imgFolder));

//Routes (ADD TRY CATCH)

app.get('/', (req, res) => {
	res.send('Welcome to Hmasterwars')
})

//REST API 

app.use('/hamsters', hamsters);
app.use('/matches', matches);

// Start server

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})