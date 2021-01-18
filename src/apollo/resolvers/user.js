import { UserInputError } from "apollo-server-micro";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/user.model";
import { validateSignup, validateLogin } from "../../utils/validation";

const userResolvers = {
  Query: {
    user: async (_, args) => {
      try {
        const user = await User.findOne({
          name: new RegExp("^" + args.name + "$", "i"),
        });
        return user;
      } catch (error) {
        throw error;
      }
    },

    allUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    async signUp(_, args) {
      const { errors, isValid } = validateSignup(args.input);

      if (!isValid) {
        throw new UserInputError(JSON.stringify(errors));
      }

      try {
        const userFound = await User.find({ email: args.input.email }).exec();
        if (userFound.length > 0) {
          throw new UserInputError("Email already exists.");
        }

        const hash = await bcrypt.hash(args.input.password, 10);

        let user = await new User({
          email: args.input.email,
          name: args.input.name,
          password: hash,
        }).save();

        const jwtPayload = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
          expiresIn: "90d",
        });

        return { user, token };
      } catch (err) {
        throw new Error(err);
      }
    },

    async signIn(_, args) {
      const { errors, isValid } = validateLogin(args.input);
      const { email, password } = args.input;

      if (!isValid) {
        throw new UserInputError(JSON.stringify(errors));
      }

      try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
          throw new UserInputError("No user exists with that email");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const jwtPayload = {
            _id: user._id,
            name: user.name,
            email: user.email,
          };
          const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
            expiresIn: "90d",
          });

          return { user, token };
        } else {
          throw new UserInputError("Wrong password. Try again");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateUser(_, args) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: args.id },
          {
            $set: {
              email: args.input.email,
              name: args.input.name,
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
          (err) => {
            if (
              err != null &&
              err.name === "MongoError" &&
              err.code === 11000
            ) {
              throw new UserInputError("This email is already in use.");
            }
          }
        );

        if (!user) throw new Error("User not found.");

        const jwtPayload = {
          name: user.name,
          email: user.email,
          _id: user._id,
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
          expiresIn: "90d",
        });

        return { user, token };
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteUser(_, args) {
      try {
        await User.deleteOne({ _id: args.id }).exec();
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default userResolvers;
