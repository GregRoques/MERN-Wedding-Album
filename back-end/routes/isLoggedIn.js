const express = require("express");
const router = express.Router();
const suid = require("rand-token").suid;
const db = require("../util/database");

router.post("/", (req, res, next) => {
  const { password, compID } = req.body;
  const logInSearch = `SELECT token FROM currLoggedIn WHERE browser='${compID.browser} AND ip='${compID.ip}''`;
  db.execute(logInSearch).then((res2) => {
    if (res2[0][0] === password) {
      const newToken = suid(16);
      const updateToken = `UPDATE currLoggedIn SET token='${newToken}'`;
      db.execute(updateToken)
        .then((res3) => {
          const { updatedToken } = res3[0][0];
          res.json(updatedToken);
        })
        .catch(() => {
          res.json(password);
        });
    } else {
      res.json("NO");
    }
  });
});

module.exports = router;
