const express = require('express');
const app = express();
const router = express.Router();

// Existing route
router.get('/', (req, res) => {
    res.send('Hello World');
    console.log('I am in app 1');
});

// Use the router for the root path
app.use('/', router);

// Import the new page router
const articlePageRouter = require('./routes/articles');
// Use the new page router for '/new-page'
app.use('/articles', articlePageRouter);


// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
    console.log('I am in app 2');
});
