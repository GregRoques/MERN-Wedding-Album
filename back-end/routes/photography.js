const express = require("express");
const router = express.Router();
const { readdirSync } = require("fs");

let weddingAlbum = {
  images: [],
  length: 0,
};

// ====================================================================== Update Photo List

const folderContents = "../public/images/weddingAlbum";

const updateList = () => {
  readdirSync(folderContents).forEach((image) => {
    if (
      image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")
    ) {
      weddingAlbum[folder].images.push(image);
    }
  });
  weddingAlbum[folder].length = readdirSync(folderContents).length;
  //console.log(weddingAlbum)
};

updateList();

setInterval(() => {
  const isNewLength = readdirSync(folderContents).length;
  if (weddingAlbum.images === [] || isNewLength !== weddingAlbum.length) {
    updateList();
  }
}, 86400000); //check once a day and update if list is empty or if list-length has changed

// ====================================================================== API Call

const noPhotosError = () => {
  const message = "Error: No Photos could be returned at this time.";
  return message;
};

router.post("/", (req, res, next) => {
  if (weddingAlbum.length > 0) {
    res.json(weddingAlbum);
  } else {
    throw new noPhotosError();
  }
});

module.exports = router;
