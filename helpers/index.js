const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function createToken (user) {
  const payload = {
    id: user.id,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };

  return jwt.encode(payload, process.env.TOKEN_SECRET || 'secretTokenHere');
};
