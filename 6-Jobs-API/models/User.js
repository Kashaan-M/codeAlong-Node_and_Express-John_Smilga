const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* check https://mongoosejs.com/docs/guide.html#methods */
userSchema.methods.getName = function () {
  return this.name;
};

module.exports = mongoose.model('User', userSchema);
