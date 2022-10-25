const constants = require("../constants");
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
    console.log(constants.dbConnectionMessage.DB_CONNECTION_SUCCESS);
  } catch (err) {
    console.log(constants.dbConnectionMessage.DB_CONNECTION_FAIL);
  }
};
