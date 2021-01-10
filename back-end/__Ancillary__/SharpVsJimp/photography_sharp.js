const express = require("express");
const router = express.Router();
const path = require("path");
const { isAuthenticated } = require("../util/middleware/authenticator");
const sharp = require("sharp");
const { readdirSync, unlink } = require("fs-extra");
const AdmZip = require("adm-zip");

// ====================================================================== Links

const folderContents = "../../public/images/weddingAlbum";

const originalPath = path.join(__dirname, `${folderContents}/full`);
const originalContents = readdirSync(originalPath);

const webPath = path.join(__dirname, `${folderContents}/web`);
const webContents = readdirSync(webPath);

const zipPath = path.join(__dirname, `${folderContents}/zip`);

// ====================================================================== Wedding Album Object for Query Response

let weddingAlbum = {
  images: originalContents,
};

// ====================================================================== Update Photo List

const deleteOriginal = (image) => {
  const brokenImagePath = `${originalPath}/${image}`;
  unlink(brokenImagePath)
    .then(() => {
      console.log(`${brokenImagePath} DELETION SUCCESS`);
      weddingAlbum.images.splice(weddingAlbum.images.indexOf(image), 1);
    })
    .catch((err) => {
      console.log(`${brokenImagePath} DELETION FAIL: ${err}`);
    });
};

const convertForWeb = (image, path) => {
  const isMedOrThumbNail = path === "med" ? 1800 : 800;

  sharp(`${originalPath}/${image}`)
    .resize(isMedOrThumbNail)
    .jpeg({
      quality: 100,
      chromaSubsampling: "4:4:4",
      force: true,
    })
    .toFile(`${webPath}/${path}_${image}`)
    .catch((err) => {
      const errMessage = `IMAGE WRITING FAILED (convertForWeb): ${err}`;
      console.log(errMessage);
      if (
        errMessage.includes("Input file contains unsupported image format") &&
        path === "med"
      ) {
        deleteOriginal(image);
      }
    });
};

const updateList = () => {
  const prevOrgLength = originalContents.length;
  originalContents.forEach((image, i) => {
    if (
      !webContents.includes(`tb_${image}`) &&
      !webContents.includes(`med_${image}`)
    ) {
      if (
        image.toLocaleLowerCase().includes(".png") ||
        image.toLocaleLowerCase().includes(".jpg") ||
        image.toLocaleLowerCase().includes(".jpeg")
      ) {
        convertForWeb(image, "med");
        convertForWeb(image, "tb");
      } else {
        deleteOriginal(image);
      }
    }
    if (prevOrgLength - 1 === i) {
      weddingAlbum.images = originalContents;
      if (prevOrgLength !== originalContents.length) {
        const file = new AdmZip();
        file.addLocalFolder(originalPath);
        file.writeZip(`${zipPath}/G+R_WeddingAlbumFull.zip`);
      }
    }
  });
};

if (
  weddingAlbum.images === [] ||
  originalContents.length * 2 !== webContents.length
) {
  weddingAlbum.images = [];
  updateList();
} // runs the second the server is started;

setInterval(() => {
  if (
    weddingAlbum.images === [] ||
    originalContents.length * 2 !== webContents.length
  ) {
    weddingAlbum.images = [];
    updateList();
  }
}, 86400000); //check once a day and updates if list is empty or if list-length has changed

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
