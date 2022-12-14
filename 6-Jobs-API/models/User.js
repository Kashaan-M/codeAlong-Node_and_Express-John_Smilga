const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
  },
});

/* check https://mongoosejs.com/docs/middleware.html */
userSchema.pre('save', async function () {
  // using function() so we can use `this` keyword . `this` will refer to the `document` in mongodb which is an instance of the `User` model
  /* console.log('this == ', this)
   * OUTPUT: 
   * this ==  {
      name: 'zaid',
      email: 'zaid2@alpha.com',
      password: '12asd3456', // NOTE password is not hashed yet!
      _id: new ObjectId("6388a40f1be4f8d10101ec6f")
    }
  */

  /* password hashing with bcryptjs */
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* check https://mongoosejs.com/docs/guide.html#methods */
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  // isMatch returns a Boolean which would be true if the stored hash(this.password) compares to the user provided password in the request(candidatePassword)
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
