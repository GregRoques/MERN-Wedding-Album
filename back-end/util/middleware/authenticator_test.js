const { TEST_isLoggedIn } = require("../password");

const isAuthenticated = (req, res, next) => {
  const { loginCheck } = req.body;
  if (TEST_isLoggedIn === loginCheck) {
    console.log("Yay!");
    next();
  } else {
    console.log("No!");
    res.send(
      `That's you who's not logged in, ha! You don't know who got that password, ha? You better get it if you want to look at my photos, ha.`
    );
  }
};

module.exports.isAuthenticated = isAuthenticated;
