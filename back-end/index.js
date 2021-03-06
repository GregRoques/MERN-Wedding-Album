const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logIn = require("./routes/logIn");
const logOut = require("./routes/logOut");
const isLoggedIn = require("./routes/isLoggedIn"); 
const photography = require("./routes/photography");
const video = require("./routes/video");

const app = express();

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/login", logIn);
app.use("/logout", logOut);
app.use("/isloggedin", isLoggedIn);
app.use("/backendPhoto", photography);
app.use("/backendVideo", video)

const PORT = 2000;
app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
