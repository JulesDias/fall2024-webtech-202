const express = require('express');
const app = express();
const router = express.Router();

//import api swagger dependencies
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middleware to parse request body (needed for POST and PUT)
app.use(express.json());

// Existing home route
router.get('/', (req, res) => {
    res.send('Hello World');
    console.log('I am in app 1');
});

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
            description: 'API Documentation for my project',
            contact: {
                name: 'Developer',
            },
            servers: [
                { url: 'http://localhost:8080' }
            ],
        },
    },
    apis: ['./routes/*.js'], // Path to your route files (adjust if necessary)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Use the router for the root path
app.use('/', router);

// Import the articles router
const articlesRouter = require('./routes/articles');

// Use the articles router for '/articles'
app.use('/articles', articlesRouter);

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
    console.log('I am in app 2');
});
