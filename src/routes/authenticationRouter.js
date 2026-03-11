const authenticationRouter = require('express').Router();

const {register, login} =require('../controllers/authenticationController');

authenticationRouter.post('/register',register);
authenticationRouter.post('/login',login);


module.exports = {
    authenticationRouter,
}