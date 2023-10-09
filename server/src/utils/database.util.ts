import mongoose from "mongoose";
import logger from "./logger.util";

export const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
  logger.info(`MongoDb: connected to ${conn.connection.host}`);
};
