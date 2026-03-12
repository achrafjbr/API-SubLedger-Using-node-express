const { verifyToken } = require("../utils/jwtoken");
const { getHeaderToken } = require("../utils/utilities");

const isAuthenticated = (request, response, next) => {
  const token = getHeaderToken(request);
  console.log("TOKEN", token);

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const decoded = verifyToken(token);
  request.user = decoded;
  console.log("DECODING TOKEN", decoded);

  console.log("USER", request.user);
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
  console.log(roles);

  return (request, response, next) => {
    console.log('INSIDE AUTHROLE HANDLER');
    console.log("CURRENT USER", request.user)
    
    const {
      user: { role },
    } = request;
    
    if (!request.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }
    console.log("role", role);
    if (!roles.includes(request.user.role)) {
      return response.status(403).json({
        message: "You are not authorized! Access denied",
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
