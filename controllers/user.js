const constants = require('../constants')
const userService = require('../services/user')

const signup = async (req, res) => {
	let response = { ...constants.defaultServiceResponse }
	try {
		const payload = await userService.signup(req.body)
		response.status = 200
		response.message = constants.userMessage.SIGNUP_SUCCESS
		response.body = payload
	} catch (err) {
		console.log('Something went wrong: Controller: signup', err)
		response.message = err.message
	}

	return res.status(response.status).send(response)
}

const signin = async (req, res) => {
	let response = { ...constants.defaultServiceResponse }
	try {
		const payload = await userService.signin(req.body)
		response.status = 200
		response.message = constants.userMessage.SIGNIN_SUCCESS
		response.body = payload
	} catch (err) {
		console.log('Something went wrong: Controller: signin', err)
		response.message = err.message
	}

	return res.status(response.status).send(response)
}

module.exports = {
	signup,
	signin,
}
