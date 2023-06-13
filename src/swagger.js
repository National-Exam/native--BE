import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from 'path';
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle Management API",
      description: "Vehicle management api for registration and retrieval",
      version: "1.0.0",
    },
  },
  // looks for configuration in specified directories
  apis: [path.join(process.cwd(), "/src/routes/*.routes.js")], // remember to make the path relative to the cwd;
};


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
