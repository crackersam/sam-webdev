const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(5, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const uploader = req.user._id;
        const filename = buf.toString("hex") + "." + file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "assets",
          metadata: { uploader },
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports = storage;
