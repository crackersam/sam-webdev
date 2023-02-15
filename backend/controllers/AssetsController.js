const gfs = require("../config/db");

const uploadFile = (req, res) => {
  return res.json({
    message: "File uploaded successfully: " + req.file.filename,
  });
};

const getMyFilenames = async (req, res) => {
  console.log(gfs);
  try {
    const files = await gfs
      .find({
        //"metadata.uploader": req.user._id
      })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "No files available",
      });
    }
    const filenames = files.map((file) => file.filename.split("-")[1]);
    console.log(filenames);
    return res.json(filenames);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadFile, getMyFilenames };
