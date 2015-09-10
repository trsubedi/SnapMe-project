var mongoose = require("mongoose");

mongoose.connect(process.env.MONGOLAB_URI ||
           		 process.env.MONGOHQ_URL || 
                 'mongodb://localhost/snapMe');

module.exports.User = require('./user.js');
module.exports.Picture = require('./images.js').model;
