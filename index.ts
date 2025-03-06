import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import setup from "./api/routes";

const app: Express = express();
const port: string | number = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS
app.options("*", cors()); // Handle preflight requests
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom logger format
logger.token("status-format", (req: Request, res: Response): string => {
  const status: number = res.statusCode;
  if (status >= 200 && status < 300) {
    return "🟢"; // Success
  } else if (status >= 300 && status < 400) {
    return "🔵"; // Redirect
  } else {
    return "🔴"; // Error
  }
});
app.use(logger(":method :url :status-format :status :response-time ms"));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Server is Up and Running!");
});

// MongoDB connection
const dbUri: string | undefined = process.env.DB_URI;
if (!dbUri) {
  console.error("DB_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(dbUri)
  .then(() => console.log("Database Connected Successfully"))
  .catch((error: Error) => {
    console.error("DB Connection Error:", error);
    process.exit(1);
  });

// Setup routes
setup(app);

// Start server
app.listen(port, () => {
  console.log(`Server Running on port http://localhost:${port}`);
});
