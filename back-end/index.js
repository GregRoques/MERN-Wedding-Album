const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logIn = require("./routes/logIn");
const isLoggedIn = require("./routes/isLoggedIn"); 
const photography = require("./routes/photography");
//const contact = require("./routes/personalData");

const app = express();

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/login", logIn);
app.use("/isloggedin", isLoggedIn);
app.use("/photography", photography);
//app.use("/contact", contact);

// app.use(express.static(path.join(__dirname, "public")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const PORT = 2000;
app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
