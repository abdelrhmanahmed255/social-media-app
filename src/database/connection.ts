import mongoose from "mongoose";
import { env } from "../config/env.service";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.dbUri);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
