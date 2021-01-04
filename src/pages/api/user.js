import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

const handlePutRequest = async (req, res) => {
  console.log("PUT");
};

const handleGetRequest = async (req, res) => {
  console.log("GET");
};
