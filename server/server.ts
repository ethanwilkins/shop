const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const connection = mongoose.connection;

const usersRouter = require("./routes/users.routes");
const imagesRouter = require("./routes/images.routes");
const productsRouter = require("./routes/products.routes");

require("dotenv").config();
const uri = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
connection.once("open", () => {
  console.log("MongoDB connection established successfully\n");
});

app.use(bodyParser.json({ extended: true, limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/users", usersRouter);
app.use("/images", imagesRouter);
app.use("/products", productsRouter);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`\n🌎 ==> Server is running on port: ${port}`);
});
