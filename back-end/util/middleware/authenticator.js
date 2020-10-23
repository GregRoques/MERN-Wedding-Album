const db = require("../util/database");

module.exports = {
  isAuthenticated: (isAuthenticated = (req, res, next) => {
    const { loginCheck } = req.body;
    const authenticatorSearch = `SELECT ip, browser FROM currLoggedIn WHERE token='${loginCheck}'`;
    db.execute(authenticatorSearch)
      .then((res) => {
        const { token } = res[0][0];
        if (token === loginCheck) {
          next();
        } else {
          res.send(
            `That's you who's not logged in, ha! You don't know who got that password, ha? You better get it if you want to look at my photos, ha.`
          );
        }
      })
      .catch(() => {
        throw "Cannot authenticate User Access";
      });
  }),
};
