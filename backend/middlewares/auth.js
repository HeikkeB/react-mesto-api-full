/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new Unauthorized('Authorization required'));
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     return next(new Unauthorized('Authorization required!'));
//   }

//   req.user = payload;
//   return next();
// };

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new Unauthorized('Authorization required'));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'fc940a6da342577ec7ecc725c90a5037');
      req.user = payload;
      next();
    } catch (err) {
      next(new Unauthorized('Authorization required'));
    }
  }
};
