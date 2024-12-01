const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const isVercel = process.env.VERCEL === "1"; // Checks if the app is running on Vercel

const serverUrl = isVercel
  ? "https://campaign-funding-api.vercel.app" // Vercel URL
  : "http://localhost:3000"; // Local development URL

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Campaign Funding API",
      version: "1.0.0",
      description:
        "API for managing campaign funding in blockchain holesky network.",
    },
    servers: [
      {
        url: serverUrl,
        description: isVercel
          ? "Production server (Vercel)"
          : "Development server (localhost)",
      },
    ],
    components: {
      securitySchemes: {
        AppKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "APP_ACCESS_ID", // The header name
          description: "API key needed to access the endpoints",
        },
      },
    },
    security: [
      {
        AppKeyAuth: [], // Apply AppKeyAuth to all endpoints by default
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Path to your route files for annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
