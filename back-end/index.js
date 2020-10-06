const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logIn = require("./routes/logIn");
const isLoggedIn = require("./routes/isLoggedIn");

const app = express();

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/logIn", logIn);
app.use("/isLoggedIn", isLoggedIn);

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 2000;
app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});