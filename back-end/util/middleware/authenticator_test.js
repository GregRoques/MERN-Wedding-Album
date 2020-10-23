const db = require("../util/database");
const { TEST_isLoggedIn } = require("../password");

module.exports = {
  isAuthenticated: (isAuthenticated = (req, res, next) => {
    const { loginCheck } = req.body;
    if (TEST_isLoggedIn === loginCheck) {
      next();
    } else {
      res.send(
        `That's you who's not logged in, ha! You don't know who got that password, ha? You better get it if you want to look at my photos, ha.`
      );
    }
  }),
};
