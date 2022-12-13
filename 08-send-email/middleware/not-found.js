const { StatusCodes } = require('http-status-codes');
const notFoundMiddleware = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).send("Route doesn't exist.");
};

module.exports = notFoundMiddleware;
