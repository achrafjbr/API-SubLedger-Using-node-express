const { User } = require("../models/User");
const { errorMessage } = require("../utils/error");

const findUserByemail = async (email) => await User.findOne({ email }).exec();

const findUserById = async (id) => await User.findOne({ _id: id }).exec();

const getUsers = async () => await User.find().exec()


module.exports = { 
    findUserByemail,
     findUserById,
     getUsers,
};

