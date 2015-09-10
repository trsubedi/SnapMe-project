var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/snapMe');

module.exports.User = require('./user.js');
module.exports.Picture = require('./images.js').model;
