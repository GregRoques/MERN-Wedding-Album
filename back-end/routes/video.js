const express = require("express");
const router = express.Router();
const axios = require('axios');
const { ytKey } = require("../util/passwords/ytKey") 
const { isAuthenticated } = require("../util/middleware/authenticator");

let videoList ={
  videoLinks: [],
  playlistLinkId: "PLM2GdNHvfSCElP-c0kHDV6nYszw1mxfkm"
};

const getVids = () => {
  videoList.videoLinks = [];

  axios("https://www.googleapis.com/youtube/v3/playlistItems", {
    params: {
      key: ytKey,
      channelId: "UCnPRjTTsNcJC0VYo2fQ1ZPw",
      playlistId: videoList.playlistLinkId,
      part: "snippet, id, contentDetails",
    },
  })
    .then((res) => {
      //console.log(res.data.items);
      const videoFeedback = res.data.items;
      videoFeedback.map((vid) => {
        videoList.videoLinks.push({
          title: vid.snippet.title,
          link: `https://www.youtube.com/embed/${vid.contentDetails.videoId}`,
        });
      });
    })
    .catch((err) => {
      console.log(err)
      // throw err;
      // You will not want to include below in your app. As this youtube channel is on my station and these are the initial videos, I know as long as the above playlist id exists so will these videos.
      videoList.videoLinks = [
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
      ]
    });
};

getVids();

  router.post("/", isAuthenticated, (req, res, next) => {
    res.json(videoList);
  })

  module.exports = router;