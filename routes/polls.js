var express = require("express"),
  router = express.Router();

router.get("/home", function(req, res) {
  res.render("polls/home");
});

router.get("/polls/new", function(req, res) {
  res.render("polls/new");
});

module.exports = router;
