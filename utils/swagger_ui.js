const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.1.0",

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        info: {
            title: 'TrueNumber',
            description: 'APIs of the TrueNumber web app',
            version: "1.0.0",
        },
        servers: [
            {
                url: 'http://localhost:4000/',
                description: 'Development server'
            },
            {
                url: 'https://api-truenumber.onrender.com/',
                description: 'Production server'
            }
        ],
        tags: [{
            name: 'Auth',
            description: 'APIs for user authentication',
        }, {
            name: 'Users',
            description: 'APIs for managing users',
        }, {
            name: 'Party',
            description: 'APIs for managing party',
        }
        ],
    },
    apis: ['*.js', './api/*.js']
}

module.exports.swaggerSpec = swaggerJSDoc(options)