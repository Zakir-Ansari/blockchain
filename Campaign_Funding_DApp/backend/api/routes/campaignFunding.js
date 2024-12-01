const express = require("express");
const { getEmployees } = require("../controllers/campaignFundingController");

const router = express.Router();

router.get("/", getEmployees);

module.exports = router;
