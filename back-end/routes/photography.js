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
  readdirSync(folderContents).map((image, i) => {
    if (
      image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")
    ) {
      weddingAlbum.images.push({ [i + 1]: image });
    }
  });
  weddingAlbum.length = readdirSync(folderContents).length;
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
    const { lengthStart, total } = req.data;
    let currResponse = {
      images: weddingAlbum.images.slice(lengthStart, total),
    };
    if (lengthStart === 0) {
      currResponse[length] = weddingAlbum.length;
    }
    res.json(weddingAlbum);
  } else {
    throw new noPhotosError();
  }
});

module.exports = router;
