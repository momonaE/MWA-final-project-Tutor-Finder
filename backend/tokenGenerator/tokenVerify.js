const jwt = require('jsonwebtoken');

module.exports.verified = (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN);
}
module.exports.verified = (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN);
}