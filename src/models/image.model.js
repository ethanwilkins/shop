import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const ImageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productId: {
      type: String,
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
