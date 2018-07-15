var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

//ROUTES
var pollRoutes = require("./routes/polls");
var userRoutes = require("./routes/users");
var topicRoutes = require("./routes/topics");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

//FIREBASE
var admin = require("firebase-admin");

var serviceAccount = require("./config/pollr-bd9fc-firebase-adminsdk-i1cuu-bcb652ef48.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pollr-bd9fc.firebaseio.com"
});

//INCLUDE ROUTES
app.use(pollRoutes);
app.use(userRoutes);
// app.use(topicRoutes);

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.listen(5500, function() {
  console.log("App running on port 5500");
});
