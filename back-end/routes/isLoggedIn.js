const express = require("express");
const router = express.Router();
const db = require("../util/database");

router
  .post("/", (req, res, next) => {
    const { password, compId } = req.body;
    const { ip, browserType } = compId;
    const logInSearch = `SELECT token FROM currLoggedIn WHERE ip='${ip}' AND browser='${browserType}'`;
    db.execute(logInSearch).then((res) => {
      if (res[0][0] && res[0][0] === password) {
        res.json("YES");
      } else {
        res.json("NO");
      }
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

module.exports = router;
