const express = require("express");
const router = express.Router();
const db = require("../util/database");

setInterval(function(){
  const compareDate = (new Date().getTime()) - 7776000000; // current date - three months in milliseconds
  const deleteUnused = `DELETE FROM currLoggedIn WHERE updated < '${compareDate}'`
  db.execute(deleteUnused).then((req,res,next)=>{
    console.log('succesffully deleted all unused accounts')
  }).catch(err=>{
    console.log(`Could Not Delete Unused Accounts: Error: ${err}`)
  })
},1209600000); // every two weeks, delete all rows that have not been updated in greater than 3 months.

router.post("/", (req, res, next) => {
  const { browser, ip} = req.body.info;
  const deleteSearch = `SELECT id FROM currLoggedIn WHERE browser='${browser}' AND ip='${ip}'`;
  db.execute(deleteSearch).then((res2) => {
    const id = res2[0][0] ? res2[0][0].id : false;
    if(id){
      const deleteId = `DELETE FROM currLoggedIn WHERE id ='${id}'`;
      db.execute(deleteId)
        .then(() => {
        console.log("LOG_OUT_SUCCESS")
        })
        .catch((err) => {
        console.log(`LOG_OUT_FAIL: ${err}`)
        })
    } else{
      console.log('started from the bottom now we the whole team here')
    }
  });
});

  
  module.exports = router;