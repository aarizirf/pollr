var express = require("express"),
  router = express.Router();

router.get("/login", function(req, res) {
  var page = "/login";
  res.render("users/login", { page: "/login" });
});

module.exports = router;
