
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  db = require('./models'),
  // User = require('./models/user.js'),
  session = require('express-session'),
  path= require('path'),
  views = path.join(process.cwd(), '/public/views');

//seve css bootstrap and js files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// connect to mongodb
// mongoose.connect('mongodb://localhost/snapMe');

//raw data
var images =[
  {url:'http://www.dayinthewild.com/wp-content/uploads/2015/05/photo-nature-images-6.jpg'},
  {url:'http://imgscenter.com/images/2014/09/13/Beauty-of-nature-random-4884759-1280-800.jpg'},
  {url:'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bachalpseeflowers.jpg'},
  {url:'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'},
  {url:'http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg'},
  {url:'https://upload.wikimedia.org/wikipedia/commons/a/a7/Rossville_Boardwalk_Wolf_River.jpg'},
  {url:'http://www.natureasia.com/common/img/splash/thailand.jpg'}
 
]
//routes to send hardcoded image urls
app.get('/images',function(req,res){
  res.send(images);
});

//static routes
app.get("/", function (req, res){
  res.sendFile(views + '/index.html');
});
app.get("/logout", function(req,res){
  res.redirect('/');
});


// app.post("/profile", function(req, res){
//   var newPicture = req.body;
//   //add a unique id
  
//   //add new picture to db array
//   images.push(newPicture);
//   //send a response with newly created object
//   res.send(newPicture);

// })

// middleware
app.use(bodyParser.urlencoded({extended: true}));
  
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    db.User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// signup route (renders signup view)
app.get('/signup', function (req, res) {
  req.currentUser(function (err, user) {
    // redirect if current user
    if (user) {
      res.redirect('/profile');
    } else {
      res.sendFile(views + '/signup.html');
    }
  });
});

// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  db.User.createSecure(newUser.email, newUser.password, function (err, user) {
    res.redirect('/login');
  });
});

// login route (renders login view)
app.get('/login', function (req, res) {
  req.currentUser(function (err, user) {
    // redirect if current user
    if (user) {
      res.redirect('/profile');
    } else {
      res.sendFile(views + '/login.html');
    }
  });
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  db.User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    // redirect to user profile
    res.redirect('/profile');
  });
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentUser(function (err, user) {
    if (user) {
      console.log("profile ",user)
      // res.send('Welcome ' + user.email);
      res.sendFile(views + '/profile.html')
    // redirect if there is no current user
    } else {
      res.redirect('/login');
    }
  });
});

app.get("/pictures/new", function(req,res){ // "/picture/new"
  // console.log(currentUser);
  res.sendFile(views + '/create.html');
});

app.post("/picture", function(req, res){
      var newPicture = req.body.url;
        console.log(newPicture);

        req.currentUser(function (err, user) {
          console.log(user);
        });
    // db.User.findOne(user._id, function(err, user) {
    // }
    // var url = req.params.url;
    // console.log(url);
    // var id = user._id;
    // user.pictures.push(url);
  
  // var user = req.params._id;
  // console.log(user);
  //add a unique id
  
  //add new picture to db array
  // images.push(newPicture);

  //send a response with newly created object
  // res.send(newPicture);

});

// logout route (destroys session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});