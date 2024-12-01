require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const campaignFundingRoutes = require("./routes/campaignFunding");
const validateAppAccess = require("./middlewares/validateAppAccess");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Public route for app status
app.get("/", (req, res) => {
  res.status(200).json({ status: "Active" });
});

// Apply validation middleware to all other routes
app.use(validateAppAccess);

// Routes
app.use("/api/campaignFunding", campaignFundingRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
