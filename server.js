import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import initializeMongoDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import fileRouter from "./routes/file.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

// Initialize express app
const app = express();
app.use(express.json()); // ❗ FIXED: You missed the `()` to call the middleware

app.use(
  cors({
    origin: "*",
  })
);

// APIs
// app.use('/api/files', fileRouter);
app.use("/api/users", authRouter);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });

// Error handling (should be after routes)
app.use(notFound);
app.use(errorHandler);
