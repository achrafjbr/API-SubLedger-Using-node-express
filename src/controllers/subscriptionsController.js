const Joi = require("joi");
const { User } = require("../models/User");
const {
  subscribe,
  getUserSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../services/subscriptionService");
const {createSubscriptionSchema, paramSchema} =require('../utils/validation');

const createSubscription = async (request, response) => {
  const { body } = request;
  const user = request.user;
 const {error} =  createSubscriptionSchema.validate(body);
    if(error) return response.status(400).json({ error: error.details[0].message });
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


const getSubscriptions = async (request, response) => {
  // Lister les abonnements : jib les abbonement dial had user
  // Doit retourner uniquement les abonnements de l’utilisateur connecté: by using populate
  const {
    user: { id },
  } = request; // [id] of user already existed in request
  console.log("UserID", id);
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


const getSubscriptionById = async (request, response) => {
  // Voir un abonnement : jib abonement b id o xofha wax belongs to this user
  //Doit vérifier que l’abonnement appartient à l’utilisateur connecté
  const {
    params: { id },
  } = request; // [id] refers to the sub id
  const { user } = request;

   const {error} =  paramSchema.validate(id);
    if(error) return response.status(400).json({ error: error.details[0].message });

  try {
    const result = await getSubscription(id);
    console.log(result);
    if (result.statusCode == 200) {
      console.log("USER ID--->", result.data.user);
      // TODO: i don't know which one is right, i'll debug this after test.
      //result.data.user._id == request.user.id
      return result.data.user == user.id
        ? response.status(200).json({
            statusCode: 200,
            message: "It's belong to this user",
          })
        : response.status(403).json({
            statusCode: 403,
            message: "dose'nt belong to this user",
          });
    } else {
      return response.status(result.statusCode).json(result);
    }
  } catch (error) {
    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};


const updateSubscriptionById = async (request, response) => {
  // xof id dial has abonnement wax fiha nafs id dial user 3ad dir update.
  // Accessible uniquement au propriétaire.
  //Doit vérifier l’ownership.
  const {
    params: { id },
  } = request; // [id] refers to the sub id
  const { user } = request;
  const { body } = request;
     const {error} =  paramSchema.validate(id);
    if(error) return response.status(400).json({ error: error.details[0].message });
  try {
    const result = await getSubscription(id);
    // that's means we have success case
    if (result.statusCode == 200) {
      console.log('connected user',result.data.user);
      console.log('body',body);
      // TODO: i don't know which one is right, i'll debug this after test.
      //result.data.user._id == request.user.id
      if (result.data.user == user.id) {
        const subscriptionResult = await updateSubscription(id, body);
        response.status(subscriptionResult.statusCode).json(subscriptionResult);
      }
    } else {
      return response.status(result.statusCode).json(result);
    }
  } catch (error) {
    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};


const deleteSubscriptionById = async (request, response) => {
  
  // xof id dial has abonnement wax fiha nafs id dial user 3ad dir delete.
  // Accessible uniquement au propriétaire.
  //Doit vérifier l’ownership.
  const {
    params: { id },
  } = request; // [id] refers to the sub id
     const {error} =  paramSchema.validate(id);
    if(error) return response.status(400).json({ error: error.details[0].message });
  try {
    const result = await getSubscription(id);
    // that's means we have success case
    if (result.statusCode == 200) {
      // TODO: i don't know which one is right, i'll debug this after test.
      //result.data.user._id == request.user.id
      if (result.data.user == request.user.id) {
        const subscriptionResult = await deleteSubscription(id);
        response.status(subscriptionResult.statusCode).json(subscriptionResult);
      }
    } else {
      return response.status(result.statusCode).json(result);
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
  updateSubscriptionById,
};
