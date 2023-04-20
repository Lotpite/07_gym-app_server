import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import router from "../routes/user.router";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use("/", router);

const start = async () => {
  await mongoose
    .connect(config.mongo.url)
    .then(() => console.log("Connected to DataBase successful"))
    .catch((error) => console.log("Failed to connect to DataBase", error));

  app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
  });
};

start();
