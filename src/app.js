import express from "express";

const app = express();
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();
const port = process.env.PORT || 8000;
// connect to db
connectDB();
// Define routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
