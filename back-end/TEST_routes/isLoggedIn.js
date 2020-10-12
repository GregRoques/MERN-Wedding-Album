const express = require("express");
const router = express.Router();
const { TEST_isLoggedIn } = require("../util/password");

router
  .post("/", (req, res, next) => {
    const { password, compId } = req.body;
    console.log(compId);

    if (password === TEST_isLoggedIn) {
      res.json("TEST");
    } else {
      res.json("NO");
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

module.exports = router;
