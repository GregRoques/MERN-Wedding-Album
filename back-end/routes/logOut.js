const express = require("express");
const router = express.Router();
const db = require("../util/database");

router.post("/", (req, res, next) => {
const { browser, ip } = req.body.info;
//console.log(req.body.info)
const deleteSearch = `SELECT id FROM currLoggedIn WHERE browser='${browser}' AND ip='${ip}'`;
db.execute(deleteSearch).then((res2) => {
    const id = res2[0][0];
    console.log(id)
    const deleteId = `DELETE FROM currLoggedIn WHERE 'id' ='${id}'`;
    db.execute(deleteId)
        .then(() => {
        console.log("LOG_OUT_SUCCESS")
        })
        .catch(() => {
        console.log("LOG_OUT_FAIL")
          })
    });
  });
  
  module.exports = router;