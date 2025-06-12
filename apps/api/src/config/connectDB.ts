import chalk from "chalk";
import mongoose from "mongoose";
import { systemLogs } from "../utils/logger";

const connectionToDb = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const DB_NAME = process.env.DB_NAME;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    const connect = await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
    });

    const msg = `MongoDB Connected: ${connect.connection.host}`;
    console.log(chalk.blue.bold(msg));
    systemLogs.info(msg);
  } catch (error: any) {
    const errMsg = `MongoDB Connection Error: ${error.message}`;
    console.log(chalk.red.bold(errMsg));
    systemLogs.error(errMsg);
    process.exit(1); // Optional: force exit if DB is critical
  }
};

export default connectionToDb;
