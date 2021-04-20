const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');

const PORT = 1204;
const frontendFolder = path.join(__dirname, 'frontend');

//Middleware
app.use(cors());
app.use(express.json());

app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use(express.static(frontendFolder));

//Routes

app.use('/hamsters', hamsters);

// Start server

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})