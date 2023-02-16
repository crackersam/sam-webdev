const mongoose = require("mongoose");

// init gfs
let gfs;
mongoose.connection.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "assets",
  });
});

const uploadFile = (req, res) => {
  return res.json({
    message: "File uploaded successfully: " + req.file.filename,
  });
};

const getMyFilenames = async (req, res) => {
  try {
    const files = await gfs
      .find({
        "metadata.uploader": req.user._id,
      })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "No files available",
      });
    }
    const rawFilenames = files.map((file) => file.filename);
    const filenames = rawFilenames.map((filename) => filename.split("-"));

    for (const file in filenames) {
      filenames[file].shift();
      filenames[file] = filenames[file].join("-");
    }

    return res.json({ filenames, rawFilenames });
  } catch (err) {
    console.error(err);
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({
        message: "No file available",
      });
    }
    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadFile, getMyFilenames, downloadFile };
