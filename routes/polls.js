var express = require("express");
var router = express.Router();
var Poll = require("../models/poll");
var Topic = require("../models/topic");
var middleware = require("../middleware");

//HOME ROUTE -- INDEX ROUTE FOR TOPICS FOLLOWED
router.get("/polls/home", middleware.isLoggedIn, function(req, res) {
  Poll.find({}, function(err, allPolls) {
    if (err) {
      console.log(err);
    } else {
      res.render("polls/home", { polls: allPolls });
    }
  });
});

//NEW POLL ROUTE
router.get("/polls/new", middleware.isLoggedIn, function(req, res) {
  Topic.find({}, function(err, allTopics) {
    if (err) {
      console.log(err);
    } else {
      res.render("polls/new", { topics: allTopics });
    }
  });
});

//NEW POLL LOGIC ROUTE
router.post("/polls/new", middleware.isLoggedIn, function(req, res) {
  Topic.findOne({ name: req.body.topicSelect }, function(err, foundTopic) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundTopic);

      var newPoll = {
        question: req.body.question,
        pollOption1: {
          text: req.body.pollOption1
        },
        pollOption2: {
          text: req.body.pollOption2
        },
        topic: {
          id: foundTopic._id,
          name: foundTopic.name
        },
        author: {
          id: req.user._id,
          username: req.user.username
        }
      };

      console.log(newPoll);

      Poll.create(newPoll, function(err, newlyCreated) {
        if (err) {
          // error happens
          console.log(err);
        } else {
          // poll created
          res.redirect("/");
        }
      });
    }
  });
});

//POLL DELETE -- check ownership later
router.get("/polls/:id/delete", function(req, res) {
  Poll.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/polls/home");
    }
  });
});

//Do not allow same user to answer poll two times in a row, kept for debugging purposes
//POLL CHOICE 1 -- GO INTO DB
router.post("/polls/:id/1", function(req, res) {
  //   var answeredBy = {
  //     id: req.user._id,
  //     username: req.user.username
  //   };

  console.log(req.params.id);

  Poll.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { "pollOption1.votes": 1 }
    },
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

//POLL CHOICE 2 -- GO INTO DB
router.post("/polls/:id/2", function(req, res) {
  //   var answeredBy = {
  //     id: req.user._id,
  //     username: req.user.username
  //   };

  console.log(req.params.id);

  Poll.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { "pollOption2.votes": 1 }
    },
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = router;
