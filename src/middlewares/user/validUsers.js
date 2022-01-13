const jwt = require('jsonwebtoken');
const status = require('../../helpers/statusCode');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const { invalidToken } = jwt
    .verify(token, 'seusecrettoken', (err, _) => ({ invalidToken: err }));
  if (invalidToken) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = checkToken;