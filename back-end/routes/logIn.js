const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const suid = require("rand-token").suid;
const { signInPW } = require('../util/passwords/loginPW_pw')
const db = require("../util/database");

router.post("/", (req, res, next) => {
  const { password, compId } = req.body;
  const { ip, browserName } = compId;

  bcrypt.compare(password, signInPW, function (err, result) {
    if (result) {
      const token = suid(16);
      if (ip && browserName) {
        const insertQuery = `INSERT INTO currLoggedIn (ip, browser, token) VALUES ('${ip}', '${browserName}', '${token}')`;
        db.execute(insertQuery)
          .then(() => {
            res.json(token);
          })
          .catch((err) => {
            console.log(`LOG_IN: Did Not Save: ${err}`)
            throw "NO"
          });
      } else {
        res.json("NO");
      }
    } else {
      res.json("NO");
    }
  });
});

module.exports = router;
