const JWT = require('jsonwebtoken');

const secret = 'seusecrettoken';

const jwtConfig = { algorithm: 'HS256' };

const generateToken = (user) => JWT.sign({ user }, secret, jwtConfig);

module.exports = {
  generateToken,
};
