const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Existing home route
router.get('/', (req, res) => {
    res.send('Hello World');
    console.log('I am in app 1');
});

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
