const { User } = require('../models/User');
const { subscribe, checkUserIsExisted, getUserSubscriptions, getSubscription, updateSubscription, deleteSubscription } = require('../services/subscriptionService');
/**
 * @desc add subscription
 * @method POST
 * @access private
 * @route /api/v1/subscription
 */

const createSubscription = async (request, response) => {
  const { body } = request;
  try {
    const result = await subscribe(body);
    response.status(result.statusCode).json(result);
  } catch (error) {
    response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

/**
 * @desc Get subscriptions belong to connected user
 * @method GET
 * @access private
 * @route /api/v1/subscription
 */
const getSubscriptions = async (request, response) => {
  // Lister les abonnements : jib les abbonement dial had user
  // Doit retourner uniquement les abonnements de l’utilisateur connecté: by using populate
  const { user: { id } } = request; // [id] of user already existed in request
  console.log('UserID', id);
  try {
    const result = await getUserSubscriptions(id);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }

};

/**
 * @desc Get subscription by id & check if this sub beloging to connected user
 * @method GET
 * @access private
 * @route /api/v1/subscription/:id
 */
const getSubscriptionById = async (request, response) => {
  // Voir un abonnement : jib abonement b id o xofha wax belongs to this user
  //Doit vérifier que l’abonnement appartient à l’utilisateur connecté
  const { params: { id } } = request; // [id] refers to the sub id
  try {
    const result = await getSubscription(id);
    // that's means we have success case
    if (!result.data)
      // TODO: i don't know which one is right, i'll debug this after test.
      //result.data.user._id == request.user.id
      return result.data.user == request.user.id ?
        response.status(200).json({
          statusCode: 200,
          message: "It's belong to this user",
        }) : response.status(403).json({
          statusCode: 403,
          message: "dose'nt belong to this user",
        });
    return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

/**
 * @desc Update subscription by id
 * @method PUT
 * @access private
 * @route /api/v1/subscription/:id
 */
const updateSubscriptionById = async (request, response) => {
  // xof id dial has abonnement wax fiha nafs id dial user 3ad dir update.
  // Accessible uniquement au propriétaire.
  //Doit vérifier l’ownership.
  const { params: { id } } = request; // [id] refers to the sub id
  try {
    const result = await getSubscription(id);
    // that's means we have success case
    if (!result.data) {
      // TODO: i don't know which one is right, i'll debug this after test.
      //result.data.user._id == request.user.id
      if (result.data.user == request.user.id) {
        const subscriptionResult = await updateSubscription(id);
        response.status(subscriptionResult.statusCode).json(
          subscriptionResult
        );
      }
    } else {
      return response.status(result.statusCode).json(
        result
      );
    }
  } catch (error) {
    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

/**
 * @desc Delete subscription by id
 * @method DELETE
 * @access private
 * @route /api/v1/subscription/:id
 */
const deleteSubscriptionById = async(request, response) => {
  // xof id dial has abonnement wax fiha nafs id dial user 3ad dir delete.
  // Accessible uniquement au propriétaire.
  //Doit vérifier l’ownership.
  const { params: { id } } = request; // [id] refers to the sub id
  try {
    const result = await getSubscription(id);
    // that's means we have success case
    if (!result.data) {
      // TODO: i don't know which one is right, i'll debug this after test.
      //result.data.user._id == request.user.id
      if (result.data.user == request.user.id) {
        const subscriptionResult = await deleteSubscription(id);
        response.status(subscriptionResult.statusCode).json(
          subscriptionResult
        );
      }
    } else {
      return response.status(result.statusCode).json(
        result
      );
    }
  } catch (error) {
    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};


module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  deleteSubscriptionById,
  updateSubscriptionById

}