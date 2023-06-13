import express from "express";
import { createVehicle, deleteVehicle, getAllVehicles, getVehicleById, getVehiclesByUser, updateVehicle } from "../controllers/vehicle.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { validateBody } from "../middleware/validator.middleware.js";
import { vehicleSchema } from "../utils/schemas.js";
import checker from "../middleware/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: number
 *         owner:
 *           type: string
 *           format: uuid
 */

/**
 * @openapi
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       500:
 *         description: Internal server error
 */

router.get("/", getAllVehicles);

// Get vehicles associated with a user
/**
 * @swagger
 * /api/v1/vehicles/{userId}:
 *   get:
 *     summary: Get vehicle by user ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Not Found - Vehicle not found for the given user ID
 *       500:
 *         description: Internal server error
 */

router.get("/user/:userId", checker, getVehiclesByUser);

// Get a single vehicle
/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the vehicle to retrieve
 *     responses:
 *       200:
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */

router.get("/:vehicleId", getVehicleById);

// Create a new vehicle
/**
 * @swagger
 * /api/v1/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 description: The make of the vehicle
 *                 example: Ford
 *               model:
 *                 type: string
 *                 description: The model of the vehicle
 *                 example: Mustang
 *               year:
 *                 type: number
 *                 description: The year of the vehicle
 *                 example: 2022
 *               owner:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the owner (User)
 *                 example: 603fcca6f4124c00151635b3
 *     responses:
 *       201:
 *         description: The created vehicle object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       500:
 *         description: Internal server error
 */

router.post("/", checker,validateBody(vehicleSchema), roleMiddleware("admin"), createVehicle);
// Update a vehicle
/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the vehicle to update
 *       - in: body
 *         name: vehicle
 *         description: The updated vehicle object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Bad request - Invalid request body
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */

router.put("/:vehicleId", checker, roleMiddleware("admin"), updateVehicle);

// Delete a vehicle
/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the vehicle to delete
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:vehicleId", checker, roleMiddleware("admin"), deleteVehicle);

export default router;
