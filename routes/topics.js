var express = require("express"),
  router = express.Router();

router.get("/topics/new", function(req, res) {
  res.render("topics/new");
});

module.exports = router;
