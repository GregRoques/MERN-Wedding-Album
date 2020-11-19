const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../util/middleware/authenticator");

const videoList = {
    videoLinks: [
        { 
            title: "Feature", 
            link:"https://www.youtube.com/embed/Sq8uC9pEd_0"
        },
        {
            title: "Full",
            link: "https://www.youtube.com/embed/wmxQ7R4ZYgE",
        },
        {
            title: "Chris Stuckey Live 1",
            link: "https://www.youtube.com/embed/sI14foi9ySg",
        },
        {
            title: "Chris Stuckey Live 2",
            link: "https://www.youtube.com/embed/mTJ5xb-Bkpo",
        }
    ],
    playlistLinkId: "PLM2GdNHvfSCElP-c0kHDV6nYszw1mxfkm"
};

  router.post("/", isAuthenticated, (req, res, next) => {
    res.json(videoList);
  })

  module.exports = router;