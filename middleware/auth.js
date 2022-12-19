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
    return next();
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
    if (!roles.includes(req.user.role)) {
      response.status = 403;
      response.message = "Access denied. You do not have the required role.";
      return res.status(response.message).send(response);
    }
    next();
  };
};

module.exports = {
  validateToken,
  restrictTo,
};
