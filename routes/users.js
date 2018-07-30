var express = require("express"),
  router = express.Router();

router.get("/login", function(req, res) {
  res.render("users/login");
});

module.exports = router;
