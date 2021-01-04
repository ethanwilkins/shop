//import User from "../../models/user.model";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  res.status(200).json({});
};
