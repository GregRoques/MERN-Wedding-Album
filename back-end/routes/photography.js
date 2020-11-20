const express = require("express");
const router = express.Router();
const path = require("path");
const Jimp = require("jimp");
const { isAuthenticated } = require("../util/middleware/authenticator");
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

const convertForWeb = (image, path) => {
  const isMedOrThumbNail = path === "med" ? 1800 : 800;
  Jimp.read(`${originalPath}/${image}`).then(Gregvich=>{
    return Gregvich
      .resize(isMedOrThumbNail, Jimp.AUTO)
      .quality(100)
      .write(`${webPath}/${path}_${image}`)
  }).catch((err) => {
    console.log(err);
  });
};

const updateList = () => {
  readdirSync(originalPath).forEach((image) => {
    if (
      (image.toLocaleLowerCase().includes(".png") ||
      image.toLocaleLowerCase().includes(".jpg") ||
      image.toLocaleLowerCase().includes(".jpeg")) &&
      (!webPath.includes(`tb_${image}`) && !webPath.includes(`med_${image}`))
    ) {
      weddingAlbum.images.push(image);
      convertForWeb(image, "med");
      convertForWeb(image, "tb");
    }
  });
  const file = new AdmZip();
  file.addLocalFolder(originalPath);
  file.writeZip(`${zipPath}/G+R_WeddingAlbumFull.zip`);
};

setTimeout(()=>{
  const originalLength = readdirSync(originalPath).length;
  const webLength = readdirSync(webPath).length;
  // console.log(originalLength)
  // console.log(webLength)
  if (weddingAlbum.images === [] || originalLength * 2 !== webLength) {
    updateList();
  }
}, 5000)


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
    res.json(currResponse);
  } 
});

module.exports = router;

