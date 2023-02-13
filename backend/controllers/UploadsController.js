const { gfs } = require("../config/db");

const uploadFile = (req, res) => {
  console.log("file uploaded successfully", req.file);
  return res.send("File uploaded successfully");
};

const getMyFiles = async (req, res) => {
  try {
    const files = await gfs
      .find({ "metadata.uploader": req.user._id })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No files available",
      });
    }
    return res.json(files);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadFile, getMyFiles };
