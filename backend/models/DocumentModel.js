const mongoose = require("mongoose");
const slugify = require("slugify");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

documentSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
