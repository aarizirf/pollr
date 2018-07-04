//NPM PACKAGES
var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose");

//MODELS
var User = require("./models/user");

//OTHER
var middleware = require("./middleware");

mongoose.connect("mongodb://localhost/pollr");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "express-session secret",
    resave: false,
    saveUninitialized: false
}));
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
app.get("/", function (req, res) {
    res.redirect("/home");
});

//HOME ROUTE
app.get("/home", middleware.isLoggedIn, function(req, res) {
    res.render("polls/home");
});

//LOGIN ROUTE
app.get("/login", function(req, res) {
    res.render("users/login.ejs");
});

//LOGIN LOGIC ROUTE
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {
});

// SERVER STARTED
app.listen(5500, function () {
    console.log("Pollr server started!");
});