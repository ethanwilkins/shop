import User from "../../../models/user.model";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};
