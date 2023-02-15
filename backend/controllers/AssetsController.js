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
    const filenames = files.map((file) => file.filename.split("-"));
    for (file in filenames) {
      filenames[file].shift();
      filenames[file] = filenames[file].join("-");
    }

    console.log(filenames);
    return res.json(filenames);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadFile, getMyFilenames };
