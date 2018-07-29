var express = require("express"),
  moment = require("moment"),
  database = require("../config/firebaseAdmin.js"),
  moment = require("moment"),
  router = express.Router();

router.get("/topics/new", function(req, res) {
  res.render("topics/new");
});

var userUid;

router.post("/currentUser/:uid", function(req, res) {
  userUid = req.params.uid;
  console.log("CURRENT USER FILLED");
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

      var isFollowing = false;
      console.log(topic.followers);
      console.log("break in between");
      if (topic.followers && topic.followers.includes(userUid)) {
        isFollowing = true;
      }
      console.log(topic.followers);
      console.log(userUid);
      console.log(isFollowing);

      res.render("topics/show", {
        topic: topic,
        topicKey: key,
        moment: moment,
        polls: pollsArray,
        isFollowing: isFollowing
      });
    });
  });
});

module.exports = router;
