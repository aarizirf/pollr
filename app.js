var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

//ROUTES
var pollRoutes = require("./routes/polls");
var userRoutes = require("./routes/users");
var topicRoutes = require("./routes/topics");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// //FIREBASE
// var admin = require("firebase-admin");

// var serviceAccount = require("./config/pollr-bd9fc-firebase-adminsdk-i1cuu-bcb652ef48.json");

// var firebaseAdmin = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://pollr-bd9fc.firebaseio.com"
// });

// var database = firebaseAdmin.database();

//INCLUDE ROUTES
app.use(pollRoutes);
app.use(userRoutes);
// app.use(topicRoutes);

app.get("/", function(req, res) {
  res.redirect("/home");
});

// app.get("/home", function(req, res) {
//   var pollsRef = database.ref("/polls");

//   pollsRef.once("value", function(snapshot) {
//     var polls = snapshot.val();

//     if (!polls) {
//       polls = {};
//     }

//     res.render("polls/home", { polls: polls });
//   });
// });

app.listen(5500, function() {
  console.log("App running on port 5500");
});
