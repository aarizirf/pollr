var mongoose = require("mongoose");
var Poll = require("./models/poll");
var Topic = require("./models/topic");
var User = require("./models/user");

function clearDB() {
  Poll.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      Topic.remove({}, function() {
        User.remove({}, function() {});
      });
    }
  });
}

module.exports = clearDB;
