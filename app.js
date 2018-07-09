//NPM PACKAGES
var express = require("express"),
  app = express(),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  bodyParser = require("body-parser"),
  clearDB = require("./seeds"),
  mongoose = require("mongoose");

//MODELS
var User = require("./models/user");
var Poll = require("./models/poll");
var Topic = require("./models/topic");

//ROUTES
var pollRoutes = require("./routes/polls");
var userRoutes = require("./routes/users");
var topicRoutes = require("./routes/topics");

//OTHER
var middleware = require("./middleware");

mongoose.connect("mongodb://localhost/pollr");
//clearDB();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.moment = require("moment");

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "express-session secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//INCLUDE ROUTES
app.use(pollRoutes);
app.use(userRoutes);
app.use(topicRoutes);

// BASE ROUTE
app.get("/", function(req, res) {
  res.redirect("/polls/home");
});

// SERVER STARTED
app.listen(5500, function() {
  console.log("Pollr server started!");
});
