import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
import { validateLogin } from "../../utils/validation";
import User from "../../models/user.model";

connectDb();

export default async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json({
        email: "Could not find email.",
      });
    }

    return bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed.",
        });
      }
      if (result) {
        const jwtPayload = {
          name: user.name,
          email: user.email,
          userId: user._id,
        };
        const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
          expiresIn: "90d",
        });
        return res.status(200).json({
          message: "Auth successful.",
          token,
        });
      }
      return res.status(401).json({
        password: "Wrong password. Try again.",
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
