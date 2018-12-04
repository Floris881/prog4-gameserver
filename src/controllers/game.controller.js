
const Game = require('../models/game.model');
const ApiError = require('../models/apierror.model');
const Pool = require('../config/db');

module.exports = {
	getAll(req, res, next) {
		
		Pool.query('SELECT * FROM games', function (err, rows, fields) {
			if (err) {
				return next(new ApiError(err, 500));
			}
			
			res.status(200).json({ result: rows }).end();
		});
	},
	getById(req, res, next) {
		const id = req.params.id; 

		Pool.execute('SELECT * FROM games WHERE ID = ?',
			[id],
			function (err, results, fields) {
				console.dir(results);

				if (err) {
					return next(new ApiError(err, 500));
				}
				if (results.length < 1) {
					return next(new ApiError(`No game found with id ${id}`, 500));
				}

				res.status(200).json({ result: results }).end();
			}
		);
	},
	addGame(req, res, next) {
		let game = req.body;
		
		const newGame = new Game(game.name, game.producer, game.release_year, game.type);

		Pool.execute("INSERT INTO games (title, producer, year, type)VALUES(?,?,?,?)",
			[newGame.name, newGame.producer, newGame.release_year, newGame.type],
			function (err, results, fields) {
				console.dir(results);
				
				if (err) {
					return next(new ApiError(err, 500));
				}
				if (results.affectedRows < 1) {
					return next(new ApiError(`Row was not inserted, contact the developer for further information`, 500));
				}

				res.status(200).json({ result: results.affectedRows + ' row(s) succesfully inserted' }).end();
			}
		);
	},
	updateGame(req, res, next) {
		const id = req.params.id;
		let game = req.body;

		const newGame = new Game(game.name, game.producer, game.release_year, game.type);

		Pool.execute("UPDATE games SET title=?, producer=?, year=?, type=? WHERE id = ?",
			[newGame.name, newGame.producer, newGame.release_year, newGame.type, id],
			function (err, results, fields) {
				console.dir(results);
				
				if (err) {
					return next(new ApiError(err, 500));
				}
				if (results.changedRows < 1) {
					return next(new ApiError(`There were no changes`, 500));
				}

				res.status(200).json({ result: results.changedRows + ' row(s) succesfully updated' }).end();
			}
		);
	},
	deleteGame(req, res) {
		const id = req.params.id;

		Pool.execute("DELETE FROM games WHERE id = ?",
			[id],
			function (err, results, fields) {
				console.dir(results);
				
				if (err) {
					return next(new ApiError(err, 500));
				}
				if (results.affectedRows < 1) {
					return next(new ApiError(`There were no changes`, 500));
				}

				res.status(200).json({ result: results.affectedRows + ' row(s) succesfully updated' }).end();
			}
		);
	}
}