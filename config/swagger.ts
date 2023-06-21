import SwaggerJSDoc from "swagger-jsdoc";

// Swagger config
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API',
        version: '1.0.0'
    }
}

const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'],
}

const swaggerSpec = SwaggerJSDoc(options);
export default swaggerSpec;
