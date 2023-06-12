import express from "express";

const app = express();
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import VehicleRouter from "./routes/vehicle.routes.js";
import UserRouter from "./routes/user.routes.js";
dotenv.config();
const port = process.env.PORT || 8000;
app.use(express.json());
// connect to db
connectDB();
// Define routes
app.get("/healthcheck", (req, res) => {
  res.send("The app is running fine");
});

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/vehicles", VehicleRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
