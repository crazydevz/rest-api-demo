const constants = require('../constants')
const jwt = require('jsonwebtoken')

module.exports.validateToken = (req, res, next) => {
	let response = { ...constants.defaultServiceResponse }

	try {
		if (!req.headers.authorization) {
			throw new Error(constants.requestValidationMessage.TOKEN_MISSING)
		}
		const token = req.headers.authorization.split(' ')[1].trim()
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		console.log('decoded', decoded)
		return next()
	} catch (err) {
		response.status = 401
		response.message = err.message
		console.log('Error', err)
	}

	return res.status(response.status).send(response)
}
