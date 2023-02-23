const asyncHandler = require("express-async-handler");
const Document = require("../models/DocumentModel");

const saveDocument = asyncHandler(async (req, res) => {
  try {
    if (!req.body.title || !req.body.rawContentState) {
      throw new Error(
        "Please provide a title and content for the document"
      );
    }
    const prevDoc = await Document.findOne({
      title: req.body.title,
      user: req.user._id,
    });

    if (prevDoc) {
      prevDoc.body = req.body.rawContentState;
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

const getMyDocuments = asyncHandler(async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user._id,
    });

    if (!documents) {
      return res
        .status(404)
        .json({ message: "No documents found" });
    }

    const docs = documents.map((doc) => {
      return { title: doc.title, slug: doc.slug };
    });

    return res.status(200).json(docs);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = { saveDocument, getMyDocuments };
