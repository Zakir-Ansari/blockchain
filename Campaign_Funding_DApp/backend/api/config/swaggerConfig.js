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
    paths: {
      "/api/campaigns": {
        get: {
          summary: "Retrieve all campaigns",
          description: "Fetches the list of all available campaigns.",
          responses: {
            200: {
              description: "List of campaigns",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", example: "0" },
                        owner: {
                          type: "string",
                          example: "0x1234567890abcdef",
                        },
                        title: { type: "string", example: "Test Campaign" },
                        description: {
                          type: "string",
                          example: "A sample campaign",
                        },
                        target: { type: "string", example: "1000000" },
                        deadline: { type: "string", example: "1734691741" },
                        amountCollected: { type: "string", example: "0" },
                        image: {
                          type: "string",
                          example: "https://example.com/image.png",
                        },
                        donators: {
                          type: "array",
                          items: { type: "string" },
                        },
                        donations: {
                          type: "array",
                          items: { type: "string" },
                        },
                        isDeleted: { type: "boolean", example: false },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Internal server error",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Path to your route files for annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
