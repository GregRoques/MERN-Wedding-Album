const express = require("express");
const router = express.Router();
const { TEST_isLoggedIn } = require("../../util/password");

router.post("/", (req, res, next) => {
  const { token, compId } = req.body;
  //console.log(req.body);
  if (token === TEST_isLoggedIn) {
    res.json("YES");
  } else {
    res.json("NO");
  }
});

module.exports = router;
