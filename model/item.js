var mongoose = require('../db-connection');
var Schema = mongoose.Schema;

var Item = new Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('Item', Item, 'item');
