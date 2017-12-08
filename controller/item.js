var Base = require('../config/base');

class Item extends Base {
  constructor() {
    super('item');
  }
}

module.exports = new Item();
