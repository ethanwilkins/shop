import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

import Image from "../../../models/image.model";
import connectDb from "../../../utils/connectDb";

connectDb();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Upload a new image
export default async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const contents = await fs.readFile(data?.files?.image.path, {
      encoding: "base64",
    });

    const newImage = new Image({
      userId: req.headers.uid,
      data: contents,
    });

    const image = await newImage.save();
    res.status(200).json({
      success: true,
      image: image,
    });
  } catch (err) {
    res.status(401).send(err);
  }
};
