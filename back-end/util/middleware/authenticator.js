const db = require("../../util/database");

const isAuthenticated = (req, res, next) => {
  const { loginCheck } = req.body;
  console.log(loginCheck)
  const authenticatorSearch = `SELECT ip, browser FROM currLoggedIn WHERE token='${loginCheck.password}'`;
  db.execute(authenticatorSearch)
    .then((res) => {
      console.log(res[0][0])
      const { ip, browser } = res[0][0];
      if (ip === loginCheck.ip && browser === loginCheck.browser) {
        next();
      } else {
        console.log("Cannot authenticate User Access");
      }
    })
    .catch((err) => {
      throw `Cannot authenticate User Access: ${err}`;
    });
}

exports.isAuthenticated = isAuthenticated;
