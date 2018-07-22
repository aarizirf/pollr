var express = require("express"),
  moment = require("moment"),
  database = require("../config/firebaseAdmin.js"),
  moment = require("moment"),
  router = express.Router();

router.get("/topics/new", function(req, res) {
  res.render("topics/new");
});

router.get("/topics/:id", function(req, res) {
  var key = req.params.id;

  var topicRef = database.ref("/topics").child(key);
  topicRef.on("value", function(topicSnapshot) {
    topic = topicSnapshot.val();
    var pollsRef = database.ref("/polls");

    pollsRef.on("value", function(pollsSnapshot) {
      var pollsArray = [];

      pollsSnapshot.forEach(function(pollSnapshot) {
        var poll = pollSnapshot.val();
        if (poll.topic.id == key) {
          pollsArray.push(poll);
        }
      });

      res.render("topics/show", {
        topic: topic,
        topicKey: key,
        moment: moment,
        polls: pollsArray
      });
    });
  });
});

router.get("/topics/:id/follow", function(req, res) {
  var key = req.params.id;

  var topicRef = database.ref("/topics").child(key);
  topicRef.on("value", function(topicSnapshot) {
    var topic = topicSnapshot.val();
    console.log(firebase.auth().currentUser);
    // if(topic.followers.includes(firebase.auth().currentUser.uid))
  });
});

module.exports = router;
