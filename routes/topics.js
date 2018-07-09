var express = require("express");
var router = express.Router();
var Topic = require("../models/topic");
var Poll = require("../models/poll");
var User = require("../models/user");
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

router.get("/topics/search", function(req, res) {
  const regex = new RegExp(escapeRegex(req.query.search), "gi");
  Topic.find({ name: regex }, function(err, foundTopics) {
    if (err) {
      console.log(err);
    } else {
      res.render("topics/search", {
        topics: foundTopics,
        query: req.query.search
      });
    }
  });
});

//TOPIC INDEX SHOW GET ROUTE
router.get("/topics/:name", middleware.isLoggedIn, function(req, res) {
  //USER IS GETTING HERE
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
            var isFollowing = false;

            Topic.count({ followers: req.user, name: topic.name }, function(
              err,
              count
            ) {
              if (err) {
                console.log(err);
              } else {
                if (count > 0) {
                  isFollowing = true;
                } else {
                  isFollowing = false;
                }
                res.render("topics/show", {
                  topic: topic,
                  polls: foundPolls,
                  isFollowing: isFollowing
                });
              }
            });
          }
        });
      }
    }
  );
});

//////////MAKE SURE TO MAKE THE GET HAPPEN IN JQUERY SO THAT PAGE VIEWS IS NOT COUNTED AGAIN // LATER ON WHEN APP ALMOSAT COMPLETE

router.get("/topics/:name/follow", middleware.isLoggedIn, function(req, res) {
  //what we are doing
  //    1)updating topics follower with current user
  //    2)finding all polls with the topic
  //    3)pushing those polls into users feed, and saving
  //    4)chronologically sorting feed, and then rendering page

  //CHECK IF FOLLOWER ALREADY FOLLOWS HERE
  Topic.findOneAndUpdate(
    { name: req.params.name },
    { $push: { followers: req.user } },
    function(err, topic) {
      if (err) {
        console.log(err);
      } else if (topic) {
        var _topic = {
          id: topic._id,
          name: topic.name
        };
        Poll.find({ topic: _topic }, function(err, polls) {
          if (err) {
            console.log(err);
          } else {
            polls.forEach(function(poll) {
              var pollPush = {
                id: poll._id,
                createdAt: poll.createdAt
              };
              req.user.feed.push(pollPush);
            });
            req.user.save(function(err) {
              if (err) {
                console.log(err);
              }
            });
            //chronologicfally sort user polls
            req.user.feed.sort(function(date1, date2) {
              // This is a comparison function that will result in dates being sorted in
              // DESCENDING order.
              if (date1 > date2) return -1;
              if (date1 < date2) return 1;
              return 0;
            });
            //rsender page
            res.redirect("/topics/" + req.params.name);
          }
        });
      } else {
        //no topic ofund
      }
    }
  );
});

router.get("/topics/:name/unfollow", middleware.isLoggedIn, function(req, res) {
  //remove follow from topic schema
  //CHECK IF FOLLOWER IS NOT FOLLOWING ALREADY
  //what we are doing
  //    1)updating topics follower removing current user
  //    2)finding all polls with the topic
  //    3)pulling those polls into users feed, and saving
  //    4)chronologically sorting feed, and then rendering page

  //CHECK IF FOLLOWER ALREADY FOLLOWS HERE
  Topic.findOneAndUpdate(
    { name: req.params.name },
    { $pull: { followers: req.user } },
    function(err, topic) {
      if (err) {
        console.log(err);
      } else if (topic) {
        var _topic = {
          id: topic._id,
          name: topic.name
        };
        Poll.find({ topic: _topic }, function(err, polls) {
          if (err) {
            console.log(err);
          } else {
            //removing polls from feed
            polls.forEach(function(poll) {
              req.user.feed.forEach(function(feedPoll, i) {
                if (feedPoll.id.toString() === poll._id.toString()) {
                  console.log(i);
                  req.user.feed.splice(i, 1);
                }
              });
            });
            req.user.save(function(err) {
              if (err) {
                console.log(err);
              }
            });
            //chronologicfally sort user polls
            req.user.feed.sort(function(date1, date2) {
              // This is a comparison function that will result in dates being sorted in
              // DESCENDING order.
              if (date1 > date2) return -1;
              if (date1 < date2) return 1;
              return 0;
            });
            //rsender page
            res.redirect("/topics/" + req.params.name);
          }
        });
      } else {
        //no topic ofund
      }
    }
  );
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
