export {};

const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const validateSignup = require("../validation/validateSignUp");
const validateLogin = require("../validation/validateLogin");
const User = require("../models/user.model");

const router = new express.Router();

// Get a user by their id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Get all users
router.get("/", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Sign up a user
router.post("/signup", async (req, res) => {
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
            _id: result._id,
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
});

// Log in a user
router.post("/login", async (req, res) => {
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
          _id: user._id,
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
});

module.exports = router;
