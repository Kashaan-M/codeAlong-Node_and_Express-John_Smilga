const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
  //
  const authHeader = req.headers.authorization;

  //console.log('authHeader', authHeader, typeof authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // better error message is 'invalid credentials'
    throw new CustomAPIError('no token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('decoded', decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
};

module.exports = authenticationMiddleware;
