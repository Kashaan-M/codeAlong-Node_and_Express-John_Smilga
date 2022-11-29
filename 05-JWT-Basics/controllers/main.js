// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;
  // to check username,password when we are working with a database we have 3 options
  // 1 - Mongoose Validation. Which gives back an error if user provided data doesn't follow the model's schema
  // 2 - Joi : an external library. The second option we've is to set up an entire additional layer of validation which is going to be sitting in front
  //    of all of our requests.And to accomplish this we will use Joi in later projects
  // 3 - Checking and validating inside the controller (over here that is)

  if (!username || !password) {
    // if the username OR the password doesn't exist
    throw new BadRequestError('username or password not provided');
  }

  // normally you send back the id stored in the database(in the payload of jwt) but since we aren't using a database in this project so we will use Date()
  const id = new Date().getDate();

  // try to keep jwt 'payload' small , better experience for user.
  // the second arg to `jwt.sign()` is `secretOrPrivateKey`. We have created a simple environment variable in `.env` called `JWT_SECRET` which is
  // very simple string. In production, you will use long, complex unguessable string value for this.
  // Keep the `secret` on the server.

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  //console.log(req.user);
  const { username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello,${username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
