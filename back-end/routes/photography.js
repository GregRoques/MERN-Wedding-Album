const express = require("express");
const router = express.Router();
const path = require("path");
const sharp = require("sharp");
const { isAuthenticated } = require("../util/middleware/authenticator_test");
const { readdirSync } = require("fs-extra");
const AdmZip = require("adm-zip");

let weddingAlbum = {
  images: [],
};

// ====================================================================== Links

const folderContents = "../../public/images/weddingAlbum";

const originalPath = path.join(__dirname, `${folderContents}/full`);
const webPath = path.join(__dirname, `${folderContents}/web`);
const zipPath = path.join(__dirname, `${folderContents}/zip`);

// ====================================================================== Update Photo List

const convertForWeb = (image, index, path) => {
  const isMedOrThumbNail = path === "med" ? 1800 : 800;

  sharp(`${originalPath}/${image}`)
    .resize(isMedOrThumbNail)
    .jpeg({
      quality: 100,
      chromaSubsampling: "4:4:4",
      force: true,
    })
    .toFile(`${webPath}/${path}_${index}.jpeg`)
    .catch((err) => {
      console.log(err);
    });
};

const updateList = () => {
  readdirSync(originalPath).forEach((image, i) => {
    if (
      image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")
    ) {
      weddingAlbum.images.push(image);
      // convertForWeb(image, i, "med");
      // convertForWeb(image, i, "tb");
    }
  });
  // const file = new AdmZip();
  // file.addLocalFolder(originalPath);
  // file.writeZip(`${zipPath}/G+R_WeddingAlbumFull.zip`);
};

updateList();

setInterval(() => {
  const originalLength = readdirSync(originalPath).length;
  const webLength = readdirSync(webPath).length;
  if (weddingAlbum.images === [] || originalLength * 2 !== webLength) {
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
