const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const connection = mongoose.connection;

const productsRouter = require("./routes/products.routes");
const usersRouter = require("./routes/users.routes");

require("dotenv").config();
const uri = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
connection.once("open", () => {
  console.log("MongoDB connection established successfully\n");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`\nServer is running on port: ${port}`);
});
