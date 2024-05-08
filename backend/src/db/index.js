// this is the db file , here the database connection is made with mongodb .

import mongoose from "mongoose";

export default async function connectDb() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB Connected !! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb Connection Failed !!", error);
    process.exit(1);
  }
}
