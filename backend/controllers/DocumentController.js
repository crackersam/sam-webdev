const asyncHandler = require("express-async-handler");
const Document = require("../models/DocumentModel");

const saveDocument = asyncHandler(async (req, res) => {
  try {
    if (!req.body.title || !req.body.rawContentState) {
      throw new Error(
        "Please provide a title and content for the document"
      );
    }
    const prevDoc = Document.findOne({
      title: req.body.title,
      user: req.user._id,
    });
    if (prevDoc.content) {
      prevDoc.content = req.body.rawContentState;
      await prevDoc.save();
      return res.status(200).json({
        message: "Document updated successfully",
      });
    }

    const document = await new Document({
      title: req.body.title,
      body: req.body.rawContentState,
      user: req.user._id,
    });
    await document.save();
    res
      .status(201)
      .json({ message: "Document created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { saveDocument };
