import express from "express";
import {
  createOwner,
  deleteOwner,
  getAllOwners,
  getOwnerById,
  getOwnersByUser,
  updateOwner,
} from "../controllers/owner.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { validateBody } from "../middleware/validator.middleware.js";
import { ownerSchema } from "../utils/schemas.js";
import checker from "../middleware/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
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
 * /api/v1/owners:
 *   get:
 *     summary: Get all owners
 *     tags:
 *       - Owners
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
 *                 $ref: '#/components/schemas/Owner'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       500:
 *         description: Internal server error
 */

router.get("/", getAllOwners);

// Get owners associated with a user
/**
 * @swagger
 * /api/v1/owners/{userId}:
 *   get:
 *     summary: Get owner by user ID
 *     tags:
 *       - Owners
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
 *               $ref: '#/components/schemas/Owner'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Not Found - Owner not found for the given user ID
 *       500:
 *         description: Internal server error
 */

router.get("/user/:userId", checker, getOwnersByUser);

// Get a single owner
/**
 * @swagger
 * /api/v1/owners/{id}:
 *   get:
 *     summary: Get a owner by ID
 *     tags:
 *       - Owners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the owner to retrieve
 *     responses:
 *       200:
 *         description: Owner found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Internal server error
 */

router.get("/:ownerId", getOwnerById);

// Create a new owner
/**
 * @swagger
 * /api/v1/owners:
 *   post:
 *     summary: Create a new owner
 *     tags:
 *       - Owners
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
 *                 description: The make of the owner
 *                 example: Ford
 *               model:
 *                 type: string
 *                 description: The model of the owner
 *                 example: Mustang
 *               year:
 *                 type: number
 *                 description: The year of the owner
 *                 example: 2022
 *               owner:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the owner (User)
 *                 example: 603fcca6f4124c00151635b3
 *     responses:
 *       201:
 *         description: The created owner object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  checker,
  validateBody(ownerSchema),  
  createOwner
);
// Update a owner
/**
 * @swagger
 * /api/v1/owners/{id}:
 *   put:
 *     summary: Update a owner by ID
 *     tags:
 *       - Owners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the owner to update
 *       - in: body
 *         name: owner
 *         description: The updated owner object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Bad request - Invalid request body
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Internal server error
 */

router.put("/:ownerId", checker, roleMiddleware("admin"), updateOwner);

// Delete a owner
/**
 * @swagger
 * /api/v1/owners/{id}:
 *   delete:
 *     summary: Delete a owner by ID
 *     tags:
 *       - Owners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the owner to delete
 *     responses:
 *       204:
 *         description: Owner deleted successfully
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:ownerId", checker, roleMiddleware("admin"), deleteOwner);

export default router;
