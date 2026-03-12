const userServices = require("../services/userService");

const getAllUsers = async (request, response) => {
  try {
    const result = await userServices.getAllUsers();
    if (result.statusCode === 200)
      return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

module.exports = { getAllUsers };
