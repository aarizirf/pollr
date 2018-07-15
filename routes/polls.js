var express = require("express"),
  router = express.Router();

router.get("/polls/new", function(req, res) {
  res.render("polls/new");
});

router.get("/home", function(req, res) {
  res.render("polls/home");
});

module.exports = router;
