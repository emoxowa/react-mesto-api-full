const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauth-err');

const auth = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
