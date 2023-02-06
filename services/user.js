const constants = require('../constants');
const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async ({ email, password }) => {
	// try {
	const user = await User.findOne({ email });
	if (user) {
		throw new Error(constants.userMessage.DUPLICATE_EMAIL);
	}

	password = await bcrypt.hash(password, 12);
	const newUser = new User({ email, password });
	const result = await newUser.save();

	return result;
	// } catch (err) {
	// console.log('Something went wrong: Service: signup', err);
	// 	throw new Error(err);
	// }
};

const signin = async ({ email, password }) => {
	// try {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error(constants.userMessage.USER_NOT_FOUND);
	}

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) {
		throw new Error(constants.userMessage.INVALID_PASSWORD);
	}

	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
		expiresIn: '1d',
	});

	return { token };
	// } catch (err) {
	// 	console.log('Something went wrong: Service: signin', err);
	// 	throw new Error(err);
	// }
};

module.exports = {
	signup,
	signin,
};
