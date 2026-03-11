const { verify, sign } = require('jsonwebtoken');
require('dotenv').config();

const signToken = (payload) => sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN);


const verifyToken = (token) => 
    verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

module.exports = {
    signToken, 
    verifyToken
}