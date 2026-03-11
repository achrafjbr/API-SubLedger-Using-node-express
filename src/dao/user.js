const { User } = require("../models/User");
const { errorMessage } = require("../utils/error");

const findUserByemail = async (email) => await User.findOne({ email }).exec();

const findUserById = async (id) => await User.findOne({ _id: id }).exec();


module.exports = { findUserByemail, findUserById };
