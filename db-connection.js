var mongoose = require('mongoose');
var MONGO_URL = 'mongodb://demo:demo!@ds149577.mlab.com:49577/docebitdb'

mongoose.Promise = require('bluebird');

mongoose.connect(MONGO_URL);

module.exports = mongoose;
