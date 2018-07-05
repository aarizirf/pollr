var express = require("express");
var router = express.Router();
var Topic = require("../models/topic");
var Poll = require("../models/poll");
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

//TOPIC INDEX GET ROUTE
router.get("/topics/:name", middleware.isLoggedIn, function(req, res) {
  Topic.findOneAndUpdate(
    { name: req.params.name },
    { $inc: { views: 1 } },
    function(err, topic) {
      if (err) {
        console.log(err);
      } else {
        Poll.find({ "topic.name": topic.name }, function(err, foundPolls) {
          if (err) {
            console.log(err);
          } else {
            res.render("topics/show", { topic: topic, polls: foundPolls });
          }
        });
      }
    }
  );
});

module.exports = router;
