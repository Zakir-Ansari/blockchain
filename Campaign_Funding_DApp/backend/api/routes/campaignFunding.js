const express = require("express");
const { getFunds } = require("../controllers/campaignFundingController");

const router = express.Router();

/**
 * @swagger
 * /api/campaigns:
 *   get:
 *     summary: Retrieve a list of campaigns
 *     description: This endpoint retrieves all campaigns available, with details like title, target, deadline, and amount collected.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of campaigns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the campaign
 *                     example: "0"
 *                   owner:
 *                     type: string
 *                     description: The Ethereum address of the campaign owner
 *                     example: "0xbFa71f78d6884AfbCa43DB3babEAf97c00220CAB"
 *                   title:
 *                     type: string
 *                     description: The title of the campaign
 *                     example: "Test Campaign"
 *                   description:
 *                     type: string
 *                     description: The description of the campaign
 *                     example: "Test Campaign"
 *                   target:
 *                     type: string
 *                     description: The target amount for the campaign in smallest currency units (e.g., wei, satoshi)
 *                     example: "1000000"
 *                   deadline:
 *                     type: string
 *                     description: The deadline for the campaign, represented as a Unix timestamp
 *                     example: "1734691741"
 *                   amountCollected:
 *                     type: string
 *                     description: The amount collected so far for the campaign in smallest currency units
 *                     example: "0"
 *                   image:
 *                     type: string
 *                     description: The image URL for the campaign
 *                     example: "https://www.sketchappsources.com/resources/source-image/metamask-fox-logo.png"
 *                   donators:
 *                     type: array
 *                     description: List of addresses that have donated to the campaign
 *                     items:
 *                       type: string
 *                       example: []
 *                   donations:
 *                     type: array
 *                     description: List of donation amounts made by the donators
 *                     items:
 *                       type: string
 *                       example: []
 *                   isDeleted:
 *                     type: boolean
 *                     description: Whether the campaign is marked as deleted or not
 *                     example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/campaigns", getFunds);

module.exports = router;
