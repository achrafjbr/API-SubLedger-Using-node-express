const userDAO = require("../dao/user");
const { User } = require("../models/User");
const { DIMessage, ErrorMessage, SuccessMessage } = require("../utils/error");
const { compareHashedPassword, hashPassword } = require("../utils/hashing");
const { signToken, verifyToken } = require("../utils/jwtoken");

const login = async (email, password) => {
  const user = await userDAO.findUserByemail(email);
  if (!user) {
    // Error
    return new DIMessage().message(
      new ErrorMessage(400, "User already existed"),
    );
  }
  // Compare between hash pass & current pass.
  const isEqual = await compareHashedPassword(password, user.password);
  if (!isEqual) {
    // Error
    return new DIMessage().message(
      new ErrorMessage(400, "Email or password wrong"),
    );
  } else {
    const payload = {
      email: user.email,
      name: user.name,
      id: user._id,
      role: user.role,
    };
    const token = signToken(payload);
    const data = {
      user,
      accessToken: token,
    };
    // Success
    return new DIMessage().message(
      new SuccessMessage(201, "Success", data),
    );
  }
};

const register = async (name, email, password) => {
  const user = await userDAO.findUserByemail(email);
  if (user) {
    return new DIMessage().message(
      new ErrorMessage(400, "User already existed"),
    );
  } else {
    // Hash password &  Create user & return result
    //1 - Hash the password:
    const hashedPassword = await hashPassword(password);
    //1 - Create user:
    const createUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // 3- return result.
    return new DIMessage().message(
      new SuccessMessage(201, "Success", createUser),
    );
  }
};

module.exports = {
  login,
  register,
};
