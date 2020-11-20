const express = require("express");
const router = express.Router();
const suid = require("rand-token").suid;
const db = require("../util/database");

router.post("/", (req, res, next) => {
  const { password, browser, ip } = req.body;
  console.log(req.body)
  const logInSearch = `SELECT id, token FROM currLoggedIn WHERE browser='${browser}' AND ip='${ip}' AND token='${password}'`;
  db.execute(logInSearch).then((res2) => {
    console.log(res2[0][0].token)
    console.log(password)
      const id = res2[0][0].id;
      const newToken = suid(16);
      const logInDate = new Date().getTime()
      const updateToken = `UPDATE currLoggedIn SET token='${newToken}', updated='${logInDate}' WHERE id='${id}'`;
      db.execute(updateToken)
        .then((res3) => {
          console.log(newToken)
          res.json(newToken);
        })
        .catch((err) => {
          throw err
        });
  }).catch((err) => {
    throw err
  });
});

module.exports = router;
