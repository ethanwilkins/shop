import mongoose from "mongoose";

const connection = {};
const uri = process.env.DATABASE_URL;

async function connectDb() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }
  // Use new database connection
  mongoose
    .connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      console.log("\nMongoDB connection established successfully 🌎\n");
      connection.isConnected = db.connections[0].readyState;
    })
    .catch((err) => console.log(err));
}

export default connectDb;
