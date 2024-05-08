// --------->> This is the server file , here the server is started and run

import dotenv from "dotenv";
import { app } from "./app.js";
import connectDb from "./db/index.js";
const port = process.env.PORT || 8000;

dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Listening on port : ${port}`);
      });
    } catch (error) {
      console.log("Error : ", error);
      throw err;
    }
  })
  .catch((err) => {
    console.log("MongoDb Connection Failed !!", err);
  });
