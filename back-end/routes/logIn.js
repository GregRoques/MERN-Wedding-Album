const express = require("express");
const router = express.Router();
const { TESTpassword } = require("../password/password");

router
  .post("/", (req, res, next) => {
    const { password, compId } = req.body;
    console.log(compId);

    if (password === TESTpassword) {
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
