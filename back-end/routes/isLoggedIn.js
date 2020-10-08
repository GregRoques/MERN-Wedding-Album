const express = require("express");
const router = express.Router();
const { databasePassword } = require("../password/password");

router
  .post("/", (req, res, next) => {
    const { password, compId } = req.body;
    console.log(compId);

    if (password === databasePassword) {
      res.json("TEST");
    } else {
      res.json("NO");
    }
  })
  .catch((err) => {
    if (err) {
      throw err;
    }
  });

module.exports = router;
