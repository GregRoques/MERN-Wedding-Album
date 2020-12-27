const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ytKey } = require("../util/passwords/ytKey");
const { isAuthenticated } = require("../util/middleware/authenticator");

let videoList = {
  videoLinks: [],
  playlistLinkId: "PLM2GdNHvfSCElP-c0kHDV6nYszw1mxfkm",
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
      console.log(err);
      console.log(`ERROR RETURNING YOUTUTBE VIDEOS FROM GOOGLE-API: ${err}`);
    });
};

getVids();

setInterval(() => {
  getVids();
}, 90000000); // updates every 25 hours...one hour apart from photo check;

router.post("/", isAuthenticated, (req, res, next) => {
  console.log(videoList)
  res.json(videoList);
});

module.exports = router;
