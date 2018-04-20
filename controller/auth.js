/**
 * Auth
 */
var bcrypt = require('bcrypt');
var UserModel = require('../model/user');
const { createToken } = require('../helpers');
var Base = require('../config/base');

class Auth extends Base {
  constructor() {
    super('user');
    this._validate = this._validate.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  _validate (oldPassword, newPassword) {
    var isMatch = bcrypt.compareSync(oldPassword, newPassword);
    return isMatch;
  }

  async login (params, response) {
    try {
      const { email, password } = params.body;
      let isMatch = false;
      let query = { email };
      let token;

      var user = await UserModel.findOne(query, { password: 1, email: 1, profile: 1 });
      if (user) {
        isMatch = await this._validate(password, user.password);
      }

      if (isMatch) {
        token = createToken(user);
      } else {
        return response.status(403).send('Authentication failed.');
      }

      var result = { _id: user._id, email: user.email, profile: user.profile, token }
      response.send(result);
    } catch (e) {
      console.log(e);
      response.status(500).send('Something went wrong.')
    }
  }

  async register (params, response) {
    try {
      const { email, password, lastname, name } = params.body;
      const profile = { name, lastname };
      console.log('HI!!!!!');

      var userModel = new UserModel({
        email,
        password,
        profile,
      });

      var userSaved = await userModel.save();
      var user = await UserModel.findOne({ _id: userSaved }, { email: 1, profile: 1 });
      var token = createToken(user);

      var result = { user, token };
      response.send(result);
    } catch (error) {
      console.log(error);
      response.status(500).send('Something went wrong.');
    }
  }
}

module.exports = new Auth();
