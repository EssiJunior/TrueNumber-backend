const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.1.0",
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
                name: 'Users',
                description: 'APIs for managing users',
            }
        ],
    },
    apis: ['*.js', './api/*.js']
}

module.exports.swaggerSpec = swaggerJSDoc(options)