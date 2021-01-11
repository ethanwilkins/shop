import User from "../../../models/user.model";
import jwt from "jsonwebtoken";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PATCH":
      await handlePatchRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

// Get a user by their name
const handleGetRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const user = await User.findOne({
      name: new RegExp("^" + id + "$", "i"),
    });

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Update a user
const handlePatchRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          email: req.body.email,
          name: req.body.name,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err) => {
        if (err != null && err.name === "MongoError" && err.code === 11000) {
          return res
            .status(500)
            .send({ message: "This email is already in use." });
        }
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const jwtPayload = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
      expiresIn: "90d",
    });

    return res.json({ user, token });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete a user
const handleDeleteRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    await User.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Successfully deleted user." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
