import express from "express";
import { createVehicle, deleteVehicle, getAllVehicles, getVehicleById, getVehiclesByUser, updateVehicle } from "../controllers/vehicle.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { validateBody } from "../middleware/validator.middleware.js";
import { vehicleSchema } from "../utils/schemas.js";
import checker from "../middleware/auth.middleware.js";

const router = express.Router();

// Create a new vehicle
router.post(
  "/",
  checker,
  validateBody(vehicleSchema),
  roleMiddleware("admin"),
  createVehicle
);
router.get("/", getAllVehicles);

// Get vehicles associated with a user
router.get("/user/:userId", checker, getVehiclesByUser);

// Get a single vehicle
router.get("/:vehicleId", getVehicleById);

// Create a new vehicle

// Update a vehicle
router.put("/:vehicleId", checker, roleMiddleware("admin"), updateVehicle);

// Delete a vehicle
router.delete("/:vehicleId", checker, roleMiddleware("admin"), deleteVehicle);

export default router;
