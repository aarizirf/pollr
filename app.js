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

const PORT = process.env.PORT || 5500;
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
