import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDb from "../../../utils/connectDb";
import { validateLogin } from "../../../utils/validation";
import User from "../../../models/user.model";

connectDb();

export default async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const jwtPayload = {
        name: user.name,
        email: user.email,
        userId: user._id,
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
        expiresIn: "90d",
      });

      res.status(200).json({
        message: "Auth successful.",
        token,
      });
    } else {
      res.status(401).send("Wrong password. Try again");
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
