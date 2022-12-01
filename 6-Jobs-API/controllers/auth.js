const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
  //if (!name || !email || !password) {
  /* The below BadRequest error is optional since we are already using the error-handler middleware for it , hence we comment this part out */
  //throw new BadRequestError('Please provide name,email and password');
  //}
  /* password hashing with bcryptjs */

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
