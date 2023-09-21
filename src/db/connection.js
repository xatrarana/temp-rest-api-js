const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

// Load environment variables
if (dotenv.error) {
  throw dotenv.error;
}

const MONGO_URL = process.env.MONGO_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Lost MongoDB connection. Reconnecting...");
  connectToDB();
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
});

module.exports = connectToDB;
