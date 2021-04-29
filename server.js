const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const matchWinners = require('./routes/matchWinners.js');
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');


const PORT = process.env.PORT || 1204;
const frontendFolder = path.join(__dirname, 'public');
const imgFolder = path.join(__dirname, 'img');

//Middleware
app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use(cors());
app.use(express.json());

app.use(express.static(frontendFolder));
app.use(express.static(imgFolder));


//Routes

//REST API 

app.use('/hamsters', hamsters);
app.use('/matches', matches);
app.use('/matchWinners', matchWinners);
app.use('/winners', winners);
app.use('/losers', losers);

// Start server

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})