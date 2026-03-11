const authService = require("../services/authenticationService");
const { signToken, verifyToken } = require("../utils/jwtoken");

const register = async (request, response) => {
  const {
    body: { name, email, password },
  } = request;
  try {
    const result = await authService.register(name, email, password);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const login = async (request, response) => {
  const {
    body: { email, password },
  } = request;
  try {
    const result = await authService.login(email, password);
    const {
      data: { accessToken },
    } = result;
    if (accessToken) {
      response.setHeader("Authorization", `Bearer ${accessToken}`);
    }
    return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
