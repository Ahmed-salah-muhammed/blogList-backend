import express from "express";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import {
  logger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

app.use(express.json());
app.use(logger);
app.use(tokenExtractor);

app.use("/api", loginRoutes);
app.use("/api", blogRoutes);
app.use("/api", userRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
