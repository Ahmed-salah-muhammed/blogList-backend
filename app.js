import express from "express";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";
import { logger, unknownEndpoint, errorHandler } from "./utils/middleware.js";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

app.use(express.json());
app.use(logger);

app.use("/api", blogRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
