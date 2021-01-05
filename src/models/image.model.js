import mongoose from "mongoose";

const { String, Number } = mongoose.Schema.Types;

const ImageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productId: {
      type: Number,
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

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
