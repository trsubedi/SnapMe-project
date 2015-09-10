
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


//static routes
app.get("/", function (req, res){
  res.sendFile(views + '/index.html');
});

//routes to send hardcoded image urls
app.get('/images',function(req,res){
  db.Picture.find({},function(err,images){
    res.send(images);
  });
 
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

app.post("/profile", function(req, res){
    db.Picture.create({url: req.body.url},function(err, picture){
      if(err){console.log(err);}
      // add the picture to current user's pictures
    res.sendFile(views+ '/profile.html');
  });

    });
    
      

      // req.currentUser(function (err, user) {
      //   console.log(user);
      //   user.pictures.push(newPicture)
      // });
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



// logout route (destroys session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});