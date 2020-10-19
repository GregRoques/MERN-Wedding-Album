const express = require("express");
const router = express.Router();
const { readdirSync } = require("fs");

let weddingAlbum = {
  images: [],
  length: 0,
};

// ====================================================================== Update Photo List

const folderContents = "../public/images/weddingAlbum/Full";

const updateList = () => {
  readdirSync(folderContents).map((image) => {
    if (
      image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")
    ) {
      weddingAlbum.images.push(image);
    }
  });
  weddingAlbum.length = readdirSync(folderContents).length;
  //console.log(weddingAlbum);
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
console.log(weddingAlbum.images.slice(95, 25));
router.post("/", (req, res, next) => {
  if (weddingAlbum.length > 0) {
    const { lengthStart } = req.body;
    const end =
      weddingAlbum.length - lengthStart >= 25
        ? 25
        : weddingAlbum.length - lengthStart;

    let currResponse = {
      images: weddingAlbum.images.slice(lengthStart, lengthStart + end),
      next: weddingAlbum.length - lengthStart > 25 ? true : false,
    };
    //console.log(currResponse);
    res.json(currResponse);
  } else {
    throw new noPhotosError();
  }
});

module.exports = router;
