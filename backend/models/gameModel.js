const mongoose = require('mongoose');

const gameModel = mongoose.Schema({
	player1: String,
	player2: String,
	turn: String,
	b1: String,
	b2: String,
	b3: String,
	b4: String,
	b5: String,
	b6: String,
	b7: String,
	b8: String,
	b9: String,
	winner:String,
});

const Game = mongoose.model("Game", gameModel);

module.exports = Game;