const express = require("express");
const router = express.Router();
const suid = require("rand-token").suid;
const db = require("../util/database");

router.post("/", (req, res, next) => {
  const { password, browser, ip } = req.body;
  console.log(req.body)
  const logInSearch = `SELECT token FROM currLoggedIn WHERE browser='${browser}' AND ip='${ip}'`;
  db.execute(logInSearch).then((res2) => {
    console.log(res2[0][0])
    if (res2[0][0] === password) {
      const newToken = suid(16);
      const updateToken = `UPDATE currLoggedIn SET token='${newToken}' WHERE browser='${browser}' AND ip='${ip}'`;
      db.execute(updateToken)
        .then((res3) => {
          const { updatedToken } = res3[0][0];
          res.json(updatedToken);
        })
        .catch(() => {
          res.json("");
        });
    } else {
      res.json("");
    }
  });
});

module.exports = router;
