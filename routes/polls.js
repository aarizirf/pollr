var express = require("express"),
  moment = require("moment"),
  router = express.Router();

//FIREBASE
var admin = require("firebase-admin");

var serviceAccount = require("../config/pollr-bd9fc-firebase-adminsdk-i1cuu-bcb652ef48.json");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pollr-bd9fc.firebaseio.com"
});

var database = firebaseAdmin.database();

router.get("/polls/new", function(req, res) {
  res.render("polls/new");
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
