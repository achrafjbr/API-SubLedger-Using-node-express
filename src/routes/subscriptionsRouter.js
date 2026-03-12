const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscriptionById,
  deleteSubscriptionById,
} = require("../controllers/subscriptionsController");
const {
  isAuthenticated,
  isUser,
  isAdmin,
  authRoles,
} = require("../middlewares/authentication");

const subscriptionRouter = require("express").Router();

// Global middleware that's check if the user is authenticated or not by [token].
subscriptionRouter.use(isAuthenticated);
/**
 * @desc add subscription
 * @method POST
 * @access private
 * @route /api/v1/subscription
 */
subscriptionRouter.post("/", authRoles('USER'), createSubscription);
/**
 * @desc Get subscriptions belong to connected user
 * @method GET
 * @access private
 * @route /api/v1/subscription
 */
subscriptionRouter.get("/", authRoles('USER'), getSubscriptions);
/**
 * @desc Get subscription by id & check if this sub beloging to connected user
 * @method GET
 * @access private
 * @route /api/v1/subscription/:id
 */
subscriptionRouter.get("/:id", authRoles('USER'), getSubscriptionById);
/**
 * @desc Update subscription by id
 * @method PUT
 * @access private
 * @route /api/v1/subscription/:id
 */
subscriptionRouter.put("/:id", authRoles('USER'), updateSubscriptionById);
/**
 * @desc Delete subscription by id
 * @method DELETE
 * @access private
 * @route /api/v1/subscription/:id
 */
subscriptionRouter.delete("/:id", authRoles('USER'), deleteSubscriptionById);




// id
//name
//price
//billingCycle (monthly | yearly)
// userId

module.exports = { subscriptionRouter };
