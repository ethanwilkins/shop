import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDb from "../../../utils/connectDb";
import { validateSignup } from "../../../utils/validation";
import User from "../../../models/user.model";

connectDb();

export default async (req, res) => {
  const { errors, isValid } = validateSignup(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.find({ email: req.body.email }).exec();
    if (user.length > 0) {
      return res.status(409).json({ error: "Email already exists." });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = await new User({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    }).save();

    const jwtPayload = {
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
      expiresIn: "90d",
    });

    res.status(201).json({ newUser, token });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
