const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
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
});

module.exports = router;
