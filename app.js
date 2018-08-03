var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

var pollRoutes = require("./routes/polls.js");
var userRoutes = require("./routes/users.js");
var topicRoutes = require("./routes/topics.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(pollRoutes);
app.use(userRoutes);
app.use(topicRoutes);

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.listen(5500, function() {
  console.log("App running on port 5500");
});
