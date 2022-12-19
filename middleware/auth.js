const constants = require("../constants");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let response = { ...constants.defaultServiceResponse };

  try {
    if (!req.headers.authorization) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }
    const token = req.headers.authorization.split(" ")[1].trim();
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    response.status = 401;
    response.message = err.message;
    console.log("Error", err);
  }

  return res.status(response.status).send(response);
};

const restrictTo = (...roles) => {
  let response = { ...constants.defaultServiceResponse };

  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new Error(constants.requestValidationMessage.NOT_AUTHORIZED);
      }
      next();
    } catch (err) {
      response.status = 403;
      response.message = err.message;
    }

    res.status(response.status).send(response);
  };
};

module.exports = {
  validateToken,
  restrictTo,
};
