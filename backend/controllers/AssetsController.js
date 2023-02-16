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
  const rawFilenameArray = req.file.filename.split(".");

  rawFilenameArray.shift();
  const filename = rawFilenameArray.join(".");
  return res.json({
    message: "File uploaded successfully: " + filename,
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
        message: "You haven't uploaded any files yet.",
      });
    }
    // sort files in decending order by upload date
    files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    const rawFilenames = files.map((file) => file.filename);
    const filenames = rawFilenames.map((filename) => filename.split("."));

    for (const file in filenames) {
      filenames[file].shift();
      filenames[file] = filenames[file].join(".");
    }

    return res.json({ filenames, rawFilenames });
  } catch (err) {
    console.error(err);
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await gfs
      .find({
        filename: req.params.filename,
        "metadata.uploader": req.user._id,
      })
      .toArray();
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

const deleteFile = async (req, res) => {
  try {
    const file = await gfs
      .find({
        filename: req.params.filename,
        "metadata.uploader": req.user._id,
      })
      .toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({
        message: "No file available",
      });
    }
    await gfs.delete(file[0]._id);
    return res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadFile, getMyFilenames, downloadFile, deleteFile };
