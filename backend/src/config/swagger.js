// Documentation for Simplicy API

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simplicy API',
      version: '1.0.0',
      description: `
      API documentation for Simplicy
      **Contacts:**
        - Oke Kolawole.S : okekolawolesunday@gmail.com
        - Aziz Nagwaka: ngwk.zz@gmail.com
        - Boluwatife Daramola: codewhizz001@gmail.com
     `,
    },
    license: {
	    name: 'MIT',
	    url: 'https://opensource.org/licenses/MIT',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['fullName', 'email', 'password', 'role', 'region'],
          properties: {
            fullName: {
              type: 'string',
              description: 'The full name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
            role: {
              type: 'string',
              description: 'The role of the user',
            },
            region: {
              type: 'string',
              description: 'The region of the user',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
