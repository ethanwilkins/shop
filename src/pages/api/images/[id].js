import Image from "../../../models/image.model";
import connectDb from "../../../utils/connectDb";

// fs, promisify, and unlink to delete image file
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

// Get an image by its id
const handleGetRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const image = await Image.findById(id);

    if (image) {
      res.json({ image });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Delete a user
const handleDeleteRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    Image.findById(id)
      .then(async (image) => {
        // Removes the image file from /uploads folder
        await unlinkAsync(image.path);
      })
      .catch((err) => {});
    // Removes Image from MongoDB
    await Image.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Successfully deleted image." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
