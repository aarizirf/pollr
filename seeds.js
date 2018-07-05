var mongoose = require("mongoose");
var Poll = require("./models/poll");

function clearDB() {
  Poll.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = clearDB;
