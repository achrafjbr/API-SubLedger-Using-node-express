const { User } = require("../models/User");
const UserDAO = require("../dao/user");
const { DIMessage, ErrorMessage, SuccessMessage } = require("../utils/error");

const getAllUsers = async () => {
  const users = await UserDAO.getUsers();
  if (users)
    return new DIMessage().message(new SuccessMessage(200, "Success", users));
  else if (users.length === 0)
    return new DIMessage().message(
      new SuccessMessage(404, "No user found", users),
    );
  else
    return new DIMessage().message(
      new ErrorMessage(502, "Something went wrong please try again...!"),
    );
};

module.exports = {
  getAllUsers,
};
