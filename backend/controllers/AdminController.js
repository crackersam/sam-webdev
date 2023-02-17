const mongoose = require("mongoose");

// init gfs
let gfs;
mongoose.connection.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "assets",
  });
});

const getListOfUsersAndAssets = async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).json({ message: "Not authorized." });
  }
  try {
    const users = await User.find();
    const UsersAndFilesList = [];
    for (const user of users) {
      const files = await gfs.find({ "metadata.uploader": user._id }).toArray();
      const rawFilenames = files.map((file) => file.filename);
      UsersAndFilesList.push({ user, rawFilenames });
    }

    return res.status(200).json({ UsersAndFilesList });
  } catch (err) {
    console.error(err);
  }
};

const downloadFile = async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).json({ message: "Not authorized." });
  }
  try {
    const file = await gfs
      .find({
        filename: req.params.filename,
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

module.exports = {
  downloadFile,
  getListOfUsersAndAssets,
};
