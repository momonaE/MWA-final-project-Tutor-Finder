const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.tokengen = (user) => {
    token = jwt.sign({ user },
        process.env.SECRET_TOKEN, {
            expiresIn: '1h'
        })
    return token;
}