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

// BASE ROUTE
app.get("/", function(req, res) {
  res.redirect("/polls/home");
});

//HOME ROUTE -- INDEX ROUTE FOR TOPICS FOLLOWED
app.get("/polls/home", middleware.isLoggedIn, function(req, res) {
  Poll.find({}, function(err, allPolls) {
    if (err) {
      console.log(err);
    } else {
      res.render("polls/home", { polls: allPolls });
    }
  });
});

//NEW POLL ROUTE
app.get("/polls/new", middleware.isLoggedIn, function(req, res) {
  res.render("polls/new");
});

//NEW POLL LOGIC ROUTE
app.post("/polls/new", middleware.isLoggedIn, function(req, res) {
  var newPoll = {
    question: req.body.question,
    pollOption1: {
      text: req.body.pollOption1
    },
    pollOption2: {
      text: req.body.pollOption2
    },
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };

  Poll.create(newPoll, function(err, newlyCreated) {
    if (err) {
      // error happens
      console.log(err);
    } else {
      // poll created
      res.redirect("/");
    }
  });
});

//POLL DELETE

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ADD WHO ANSWERED TO THIS HERE
//POLL CHOICE 1 -- GO INTO DB
app.post("/polls/:id/1", middleware.isLoggedIn, function(req, res) {
  var answeredBy = {
    id: req.user._id,
    username: req.user.username
  };

  Poll.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { "pollOption1.votes": 1 },
      $push: { "poll.answersFrom": answeredBy }
    },
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

//POLL CHOICE 2 -- GO INTO DB
app.post("/polls/:id/2", middleware.isLoggedIn, function(req, res) {
  var answeredBy = {
    id: req.user._id,
    username: req.user.username
  };

  Poll.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { "pollOption2.votes": 1 },
      $push: { "poll.answersFrom": answeredBy }
    },
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

//REGISTER ROUTE
app.get("/register", function(req, res) {
  res.render("users/register");
});

// REGISTER LOGIC ROUTE
app.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
});

//LOGIN ROUTE
app.get("/login", function(req, res) {
  res.render("users/login");
});

//LOGIN LOGIC ROUTE
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// LOGOUT ROUTE
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// SERVER STARTED
app.listen(5500, function() {
  console.log("Pollr server started!");
});
