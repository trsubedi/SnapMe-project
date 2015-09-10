var REPL = require("repl");
var db = require("./models");

var repl = REPL.start("> ");
repl.context.db = db;
repl.context.allUsers = allUsers;

repl.on("exit", function () {
 console.log("Goodbye");
 process.exit();
});

function allUsers() {
 db.User.find({}, function (err, users) {
   if (err) { return console.log(err); }
   return console.log(users);
 });
}