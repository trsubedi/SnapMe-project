var db = require("./models")

//raw data
var seedImages =[
  {url:'http://www.dayinthewild.com/wp-content/uploads/2015/05/photo-nature-images-6.jpg'},
  {url:'http://imgscenter.com/images/2014/09/13/Beauty-of-nature-random-4884759-1280-800.jpg'},
  {url:'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bachalpseeflowers.jpg'},
  {url:'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'},
  {url:'http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg'},
  {url:'https://upload.wikimedia.org/wikipedia/commons/a/a7/Rossville_Boardwalk_Wolf_River.jpg'},
  {url:'http://www.natureasia.com/common/img/splash/thailand.jpg'}
]

db.Picture.remove({}, function (err, images) {
  if (err) { return console.log(err); }
  console.log('all images removed');
  seedImages.forEach(function (image) {
	  db.Picture.create({url: image.url}, function (err, newImage) {
	  	if (err) { return console.log(err); }
	  	console.log('image added: ', newImage.url)
	  });
  });
});


