const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../util/middleware/authenticator");

const videoList = [
  {
    title: 'Feature',
    link: "https://www.youtube.com/embed/Sq8uC9pEd_0"
  },
  {
    title: 'Full',
    link: "https://www.youtube.com/embed/wmxQ7R4ZYgE"
  }
];

router.post("/", isAuthenticated, (req, res, next) => {
  res.json(videoList);
});

module.exports = router;


