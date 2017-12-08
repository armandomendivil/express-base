var mongoose = require('../db-connection');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  lastname: String,
});

module.exports = mongoose.model('User', User, 'user');
