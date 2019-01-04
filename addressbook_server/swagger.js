const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        title: 'Address API',
        version: '1.0.0',
        description: 'Address 명세서'
    },
    host: "localhost:8080",
    basePath: "/"
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        'routes/*/*.js'
    ]
};

const swaggerSpec = module.exports.swaggerSpec = swaggerJSDoc(options);

module.exports.swaggerUi = swaggerUi;