const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Page articles');
    console.log('I am on the new page');
});

module.exports = router;
