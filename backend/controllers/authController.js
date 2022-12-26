const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
	const { name, username, email, password } = req.body;
	if (!name || !username || !password || !email) {
		res.status(400);
		throw new Error("Please fill all the fields");
	}
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("Email already exists, please login");
	}
	const usernameExists = await User.findOne({ username });
	if (usernameExists) {
		res.status(400);
		throw new Error("This username is already taken");
	}

	const createdUser = await User.create({ name, username, email, password });
	if (createdUser) {
		res.status(201).json({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			username: createdUser.username,
			token: generateToken(createdUser._id),
		});
	} else {
		res.status(400);
		throw new Error("User not created");
	}
});
const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Username or Password");
	}
});
module.exports = { registerUser, loginUser };
