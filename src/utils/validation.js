const Joi = require('joi');

const createSubscriptionSchema= Joi.object({
    name : Joi.string().required(),
    price : Joi.number().integer().required(),
    billingCycle:Joi.string().required(),
    user:Joi.string().required(),
});


const registerSchema= Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password:Joi.string().required(),
});

const loginSchema= Joi.object({
    email : Joi.string().email().required(),
    password:Joi.string().required(),
});

const paramSchema = Joi.object({
    id: Joi.string().email().required(),
});

module.exports = {
    createSubscriptionSchema,
    loginSchema,
    registerSchema,
    paramSchema
}