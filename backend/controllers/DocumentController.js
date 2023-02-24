const asyncHandler = require("express-async-handler");
const Document = require("../models/DocumentModel");
const slugify = require("slugify");

const saveDocument = asyncHandler(async (req, res) => {
  try {
    if (!req.body.title || !req.body.rawContentState) {
      throw new Error(
        "Please provide a title and content for the document"
      );
    }

    const prevDoc = await Document.findOne({
      slug: slugify(req.body.title, { lower: true }),
      user: req.user._id,
    });

    if (prevDoc) {
      return res.status(400).json({
        message:
          "You already have a document with this title",
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

const getDocument = asyncHandler(async (req, res) => {
  try {
    const document = await Document.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!document) {
      return res
        .status(404)
        .json({ message: "No document found" });
    }

    return res.status(200).json(document);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const updateDocument = asyncHandler(async (req, res) => {
  try {
    const document = await Document.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!document) {
      return res
        .status(404)
        .json({ message: "No document found" });
    }

    document.title = req.body.title;
    document.body = req.body.rawContentState;

    await document.save();

    return res
      .status(200)
      .json({ message: "Document updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = {
  saveDocument,
  getMyDocuments,
  getDocument,
  updateDocument,
};
