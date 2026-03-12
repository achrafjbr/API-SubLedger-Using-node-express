const { authRoles, isAuthenticated } = require("../middlewares/authentication");

const userRouter = require("express").Router();


userRouter.use(isAuthenticated);
/**
 * @desc Get subscriptions belong to connected user
 * @method GET
 * @access private
 * @route /api/v1/users
 */
userRouter.get(
  "/",
  authRoles("ADMIN"),
  require("../controllers/userController").getAllUsers,
);

module.exports = {
  userRouter,
};
