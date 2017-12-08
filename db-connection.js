var mongoose = require('mongoose');
var MONGO_URL = 'mongodb://localhost:27017/test';

mongoose.Promise = require('bluebird');

mongoose.connect(MONGO_URL);

module.exports = mongoose;
