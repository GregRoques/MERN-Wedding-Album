const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signInPW, TEST_isLoggedIn } = require("../util/password");

router.post("/", (req, res, next) => {
  const { password, compId } = req.body;
  console.log(req.body);
  bcrypt.compare(password, signInPW, function (err, result) {
    console.log(result);
    if (result) {
      res.json(TEST_isLoggedIn);
    } else {
      res.json("NO");
    }
  });
});

module.exports = router;
