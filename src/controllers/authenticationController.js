const authService = require("../services/authenticationService");
const { signToken, verifyToken } = require("../utils/jwtoken");
const { registerSchema, loginSchema } = require("../utils/validation");

const register = async (request, response) => {
  const {
    body: { name, email, password },
  } = request;
  const {error} = registerSchema.validate(body);
  if(error) return response.status(400).json({ error: error.details[0].message });

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
    const {error} = loginSchema.validate(body);
  if(error) return response.status(400).json({ error: error.details[0].message });
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
