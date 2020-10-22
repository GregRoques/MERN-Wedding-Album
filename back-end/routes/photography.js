const express = require("express");
const router = express.Router();
const path = require("path");
const { readdirSync } = require("fs");

let weddingAlbum = {
  images: [],
};

// ====================================================================== Update Photo List

const folderContents = "../../public/images/weddingAlbum/full";
const mypath = path.join(__dirname, folderContents);

const updateList = () => {
  readdirSync(mypath).forEach((image) => {
    if (
      image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")
    ) {
      weddingAlbum.images.push(image);
    }
  });
  console.log(weddingAlbum);
};

updateList();

setInterval(() => {
  const isNewLength = readdirSync(folderContents).length;
  if (weddingAlbum.images === [] || isNewLength !== weddingAlbum.length) {
    updateList();
  }
}, 86400000); //check once a day and update if list is empty or if list-length has changed

// ====================================================================== API Call

router.post("/", (req, res, next) => {
  if (weddingAlbum.images.length > 0) {
    const { lengthStart } = req.body;
    let currResponse = {
      images: weddingAlbum.images.slice(lengthStart, lengthStart + 25),
    };
    if (lengthStart === 0) {
      currResponse.albumLength = weddingAlbum.images.length;
    }
    console.log(currResponse);
    res.json(currResponse);
  }
});

module.exports = router;
