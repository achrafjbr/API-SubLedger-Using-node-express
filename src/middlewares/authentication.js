const { verifyToken } = require("../utils/jwtoken");
const { getHeaderToken } = require("../utils/utilities");

const isAuthenticated = (request, response, next) => {
  const token = getHeaderToken(request);
  console.log("token",token);
  request.user = token;
  console.log("USER",request.user);
  if (!token) return response.status(401).json({ message: "No token" });
  next();
};

const isAdmin = (request, response, next) => {
  const token = getHeaderToken(request);
  const decoded = verifyToken(token);
  request.user = decoded;
  if (decoded.user.role == true) next();
  response.status(403).json({ message: "Unauthorized" });
};

const isUser = (request, response, next) => {
  const token = getHeaderToken(request);
  const decoded = verifyToken(token);
  request.user = decoded;
  if (decoded.user.role == false) next();
  return response.status(403).json({ message: "Unauthorized" });
};

const authRoles = (...roles) => {
  return (response, request, next) => {
    if (!roles.includes(request.user.role)) {
      return response.status(403).json({
        message: "Forbidden",
      });
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  authRoles,
  isAdmin,
  isUser,
};
