const express = require("express");
const router = express.Router();
const path = require("path");
const { isAuthenticated } = require("../util/middleware/authenticator");
const { readdirSync} = require("fs-extra");

// ====================================================================== Links

const folderContents = "../../public/images/weddingAlbum";

const originalPath = path.join(__dirname, `${folderContents}/full`);
const originalContents = readdirSync(originalPath);

// ====================================================================== Wedding Album Object for Query Response

const weddingAlbum = {
  images: originalContents,
};

// ====================================================================== API Call

router.post("/", isAuthenticated, (req, res, next) => {
  if (weddingAlbum.images.length > 0) {
    const { lengthStart } = req.body;
    let currResponse = {
      images: weddingAlbum.images.slice(lengthStart, lengthStart + 25),
    };
    if (lengthStart === 0) {
      currResponse.albumLength = weddingAlbum.images.length;
    }
    res.json(currResponse);
  }
});

module.exports = router;
