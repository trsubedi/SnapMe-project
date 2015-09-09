var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// define image schema
var PictureSchema = new Schema({
  url: String,
});

var Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;