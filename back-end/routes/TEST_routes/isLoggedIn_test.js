const express = require("express");
const router = express.Router();
const { TEST_isLoggedIn } = require("../../util/password");

router.post("/", (req, res, next) => {
  const { token, userId } = req.body;

  if (token === TEST_isLoggedIn) {
    res.json(TEST_isLoggedIn);
  } else {
    throw "Sorry, no ticket...";
  }
});

module.exports = router;
