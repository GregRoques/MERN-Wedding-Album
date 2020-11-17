const express = require("express");
const router = express.Router();
const suid = require("rand-token").suid;
const db = require("../util/database");

router.post("/", (req, res, next) => {
  const { password, browser, ip } = req.body;
  console.log(req.body)
  const logInSearch = `SELECT id FROM currLoggedIn WHERE browser='${browser}' AND ip='${ip}' AND token='${password}'`;
  db.execute(logInSearch).then((res2) => {
    console.log(res2[0][0])
      const id = res2[0][0];
      const newToken = suid(16);
      const logInDate = new Date().getTime()
      const updateToken = `UPDATE currLoggedIn SET token='${newToken}' AND updated='${logInDate}' WHERE id=${id}`;
      db.execute(updateToken)
        .then((res3) => {
          const { updatedToken } = res3[0][0];
          res.json(updatedToken);
        })
        .catch(() => {
          res.json("");
        });
  });
});

module.exports = router;
