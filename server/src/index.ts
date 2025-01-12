import express, { Request, Response } from "express";
import { log } from "./lib/helper";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/userRoutes";
import { AdminRouter } from "./routes/adminRoutes";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v0/user", UserRouter);
app.use("/api/v0/admin", AdminRouter);

const URI = process.env.MONGO_URI;
if (!URI) throw new Error("No MongoURL Provided");

mongoose
  .connect(URI)
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      log.info(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    log.error(`${error}`);
  });
