const router = require('express').Router();
const gameController = require('../controllers/game.controller');

router.route('/games')
	.get(gameController.getAll)
	.post(gameController.addGame);
router.route('/games/:id')
	.get(gameController.getById)
	.put(gameController.updateGame)
	.delete(gameController.deleteGame);