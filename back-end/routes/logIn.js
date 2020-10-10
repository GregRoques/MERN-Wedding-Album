const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signInPW, TEST_isLoggedIn } = require("../util/password");

router.post("/", (req, res, next) => {
  const { password, compId } = req.body;

  bcrypt.compare(password, signInPW, function (err, result) {
    if (result) {
      res.json(TEST_isLoggedIn);
      console.log(compId);
    } else {
      res.json("NO");
    }
  });
});
// .catch((err) => {
//   console.log(err);
// });

module.exports = router;
