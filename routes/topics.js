var express = require("express");
var router = express.Router();
var Topic = require("../models/topic");
var middleware = require("../middleware");

//NEW TOPIC GET ROUTE
router.get("/topics/new", middleware.isLoggedIn, function(req, res) {
  res.render("topics/new");
});

//NEW TOPIC POST ROUTE
router.post("/topics/new", middleware.isLoggedIn, function(req, res) {
  var newTopic = {
    name: req.body.name,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };

  Topic.create(newTopic, function(err, newlyCreated) {
    if (err) {
      // error happens
      console.log(err);
    } else {
      // poll created
      res.redirect("/");
    }
  });
});

module.exports = router;
