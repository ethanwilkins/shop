import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
import { validateSignup } from "../../utils/validation";
import User from "../../models/user.model";

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
    return bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      });
      return newUser
        .save()
        .then((result) => {
          const jwtPayload = {
            name: result.name,
            email: result.email,
            userId: result._id,
          };
          const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
            expiresIn: "90d",
          });

          res.status(201).json({ result, token });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
