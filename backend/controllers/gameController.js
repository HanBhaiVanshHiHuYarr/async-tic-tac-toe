const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const User = require("../models/userModel");

const allusers = asyncHandler(async (req, res) => {
	const users = await Game.find({
		$or: [{ player1: req.params.username }, { player2: req.params.username }],
	});
	res.status(200).send(users);
});

const createController = asyncHandler(async (req, res) => {
	const { player1, player2 } = req.body;
	if (!player1 || !player2) {
		res.status(400);
		throw new Error("Player 1 or Player 2 username not received");
	}

	const user = await User.findOne({ username: player2 });
	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	const createdGame = await Game.create({
		player1: player1,
		player2: player2,
		turn: player1,
		b1: "",
		b2: "",
		b3: "",
		b4: "",
		b5: "",
		b6: "",
		b7: "",
		b8: "",
		b9: "",
		winner: "",
	});
	if (createdGame) {
		res.status(200).json(createdGame);
	} else {
		res.status(400);
		throw new Error("Game not created");
	}
});

const updateController = asyncHandler(async (req, res) => {
	const singleGame = req.body;
	let old = await Game.findOneAndUpdate({ _id: singleGame._id }, singleGame);
	if (old) {
		res.status(200).send("Game updated");
	} else {
		res.status(400);
		throw new Error("Game not updated");
	}
});

module.exports = { allusers, createController, updateController };
