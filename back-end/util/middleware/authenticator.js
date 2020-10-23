// const db = require("../util/database");

// const isAuthenticated = (req, res, next) => {
//   const { loginCheck } = req.body;
//   const authenticatorSearch = `SELECT ip, browser FROM currLoggedIn WHERE token='${loginCheck}'`;
//   db.execute(authenticatorSearch)
//     .then((res) => {
//       const { token } = res[0][0];
//       if (token === loginCheck) {
//         next();
//       } else {
//         throw "Cannot authenticate User Access";
//       }
//     })
//     .catch(() => {
//       throw "Cannot authenticate User Access";
//     });
// }

// exports.isAuthenticated = isAuthenticated;
