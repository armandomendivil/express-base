var Base = require('../config/base');

class User extends Base {
  constructor() {
    super('user');
  }
}

module.exports = new User();
