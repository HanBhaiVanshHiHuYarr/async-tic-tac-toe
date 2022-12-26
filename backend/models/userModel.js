const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPass) {
	return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
