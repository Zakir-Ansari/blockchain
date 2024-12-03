const express = require("express");
const { getFunds } = require("../controllers/campaignFundingController");

const router = express.Router();

router.get("/campaigns", getFunds);

module.exports = router;
