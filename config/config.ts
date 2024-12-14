import mongoose from "mongoose";
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI || "";

export const dbConnection = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Database connected succesfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting the Database");
  }
};
