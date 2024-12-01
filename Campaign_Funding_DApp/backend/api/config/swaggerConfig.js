const swaggerJsdoc = require("swagger-jsdoc");

console.log("SWAGGER PATH:", __dirname);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Management API",
      version: "1.0.0",
      description: "API documentation for the Employee Management system",
    },
    servers: [
      {
        url: "https://campaign-funding-api.vercel.app",
        description: "Development server",
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
  apis: ["./routes/*.js"], // Path to your route files for annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
