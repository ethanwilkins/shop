export {};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    userId: {
      type: Number,
    },
    productId: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;