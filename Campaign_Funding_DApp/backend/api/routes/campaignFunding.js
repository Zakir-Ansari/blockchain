const express = require("express");
const { getEmployees } = require("../controllers/campaignFundingController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API for managing employees
 */

/**
 * @swagger
 * /api/campaignFunding:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", getEmployees);

module.exports = router;
