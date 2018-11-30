
const Game = require('../models/game.model');
const ApiError = require('../models/apierror.model');

let games = [
	new Game(0, 'Battlefield V', 'EA', 2018, 'FPS')
]

module.exports = {
	getAll(req, res) {
		res.status(200).json(games).end();
	},
	getById(req, res, next) {
		const id = req.params.id;
		
		if (id < 0 || id > games.length) {
			next(new ApiError('ID not found', 404));
		}
		else {
			res.status(200).json(
				games[id]
			).end()
		}
	},
	addGame(req, res) {
		let game = req.body;
		const gameId = games[games.length - 1].id + 1;
		
		const newGame = new Game(gameId, game.name, game.producer, game.release_year, game.type);

		games.push(newGame);

		res.status(200).json({
			status: '200',
			message: req.body.name+' added to the list'
		}).end()
	},
	updateGame(req, res) {
		const id = req.params.id;
		let gameIndex;
		let game = req.body;

		const newGame = new Game(parseInt(id), game.name, game.producer, game.release_year, game.type);

		//find the array index of object
		for (let x = 0; x < games.length; x += 1){
			if (games[x].id == id) {
				gameIndex = x;
			}
		}

		games[gameIndex] = newGame;

		res.status(200).json({
			status: 200,
			message: req.params.id+' updated'
		}).end();
	},
	deleteGame(req, res) {
		const id = req.params.id;

		let gameIndex;

		//find the array index of object
		for (let x = 0; x < games.length; x += 1){
			if (games[x].id == id) {
				gameIndex = x;
			}
		}

		games.splice(gameIndex, 1);

		res.status(200).json({
			status: 200,
			message: 'succesfully deleted game '+req.params.id
		}).end();
	}
}