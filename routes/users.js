var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");
var passport = require("passport");

//REGISTER ROUTE
router.get("/register", function(req, res) {
  res.render("users/register");
});

// REGISTER LOGIC ROUTE
router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
  res.render("users/login");
});

//LOGIN LOGIC ROUTE
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// LOGOUT ROUTE
router.get("/logout", middleware.isLoggedIn, function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
