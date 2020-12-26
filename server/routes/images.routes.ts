export {};

const express = require("express");
const Image = require("../models/image.model");
const multerUpload = require("../config/multer");
const router = new express.Router();

// fs, promisify, and unlink to delete image file
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// Upload a new image
router.route("/").post(multerUpload.single("image"), async (req, res) => {
  const newImage = new Image({
    name: req.body.name,
    path: req.file.path,
  });
  try {
    const image = await newImage.save();
    return res.status(200).json({
      success: true,
      image: image,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Get an image by their id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

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
});

// Get all images
router.get("/", async (req, res) => {
  Image.find()
    .then((images) => res.json(images))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete an image
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    Image.findById(id)
      .then(async (image) => {
        // Removes the image file from /uploads folder
        await unlinkAsync("uploads/" + image.path);
      })
      .catch((err) => {});
    // Removes Image from MongoDB
    await Image.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Successfully deleted image." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
