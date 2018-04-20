const bcrypt = require('bcrypt');
const moment = require('moment');
const isEmail = require('validator/lib/isEmail');
var mongoose = require('../db-connection');

var Schema = mongoose.Schema;

var minlength = [6, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

var User = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: {
      isAsync: true,
      validator: (value) => isEmail(value),
      message: 'Please fill a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: minlength,
  },
  profile: {
    name: '',
    lastname: '',
  },
  createdAt: {
    type: Date,
    default: moment.utc(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { versionKey: false });

User.pre('save', function (next) {
  let user = this;
  user.updatedAt = new Date(moment.utc());

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}, { strict: false });

User.path('email').validate(function (value, done) {
  if (this.isNew) {
    this.model('User').count({ email: value }, function (err, count) {
      if (err) {
        return done(err);
      }
      done(!count);
    });
  } else {
    done(1);
  }
}, 'Email already exists');

module.exports = mongoose.model('User', User, 'user');
