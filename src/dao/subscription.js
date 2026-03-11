const { Subscription } = require("../models/Subscriptions");

const subscribe = async (subscription) =>
  await Subscription.create(subscription);

const getSubscription = async (subscriptionId) =>
  await Subscription.findOne({_id: subscriptionId});

module.exports = {
  subscribe,
  getSubscription,
};
