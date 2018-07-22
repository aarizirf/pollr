var express = require("express"),
  moment = require("moment"),
  database = require("../config/firebaseAdmin.js"),
  router = express.Router();

router.get("/polls/new", function(req, res) {
  var topicsRef = database.ref("/topics");

  topicsRef.once("value", function(snapshot) {
    var topics = snapshot.val();

    if (!topics) {
      topics = {};
    }

    res.render("polls/new", { topics: topics });
  });
});

router.get("/home", function(req, res) {
  var pollsRef = database.ref("/polls");

  pollsRef.once("value", function(snapshot) {
    var polls = snapshot.val();

    if (!polls) {
      polls = {};
    }

    res.render("polls/home", { polls: polls, moment: moment });
  });
});

module.exports = router;
