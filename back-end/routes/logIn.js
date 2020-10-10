const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { databasePassword, TEST_isLoggedIn } = require("../util/password");

router.post("/", (req, res, next) => {
  const { password, compId } = req.body;

  bcrypt.compare(password, databasePassword, function (err, result) {
    if (password === result) {
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
