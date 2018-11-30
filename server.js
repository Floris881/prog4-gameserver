
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const gameRouters = require('./src/routers/game.routers');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const port = 3000;

app.use('/api', gameRouters);

app.use('*', (req, res, next) => {
	next(new ApiError('Non-existing endpoint', 404))
});

app.use('*', (err, req, res, next) => {
	res.status(err.code).json({error: err}).end()
})

app.listen(port, () => console.log(`server started, listening on port ${port}`))