const express = require("express");
const router = express.Router();
const path = require("path");
const sharp = require("sharp");
const { isAuthenticated } = require("../util/middleware/authenticator_test");
const { readdirSync } = require("fs-extra");

let weddingAlbum = {
  images: [],
};

// ====================================================================== Update Photo List

const folderContents = "../../public/images/weddingAlbum";
const originalPath = path.join(__dirname, `${folderContents}/full`);

const updateList = () => {
  readdirSync(originalPath).forEach((image) => {
    if (
      image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")
    ) {
      weddingAlbum.images.push(image);
      if (readdirSync(`${folderContents}/web`).includes(`med_${image}`)) {
        sharp(`${folderContents}/full/${image}`)
          .resize(2000)
          .toFile(`${folderContents}/web/med_${image}`);
      }
      if (readdirSync(`${folderContents}/web`).includes(`tb_${image}`)) {
        sharp(`${folderContents}/full${image}`)
          .resize(600)
          .toFile(`${folderContents}/web/tb_${image}`);
      }
    }
  });
};

updateList();

setInterval(() => {
  const isNewLength = readdirSync(`${folderContents}/full`).length;
  if (weddingAlbum.images === [] || isNewLength !== weddingAlbum.length) {
    updateList();
  }
}, 86400000); //check once a day and update if list is empty or if list-length has changed

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
    //console.log(currResponse);
    res.json(currResponse);
  } else {
    throw "Cannot Retrieve Photos at this time.";
  }
});

module.exports = router;
