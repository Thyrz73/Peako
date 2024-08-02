const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js','./server.js','./swaggerTags.js'/*,'./swaggerSchemas.js'*/], // chemins vers les fichiers contenant des annotations Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;
