import Image from "../../../models/image.model";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ images });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};
