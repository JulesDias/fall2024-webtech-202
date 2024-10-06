const express = require('express');
const router = express.Router();
const db = require('../db');  // Import db.js

// Destructure articles and comments from db
const { articles, comments } = db;

// Route to get all articles
router.get('/', (req, res) => {
    res.json(articles);
});


// Route to create a new article
router.post('/', (req, res) => {
    const newArticle = {
        id: require('crypto').randomUUID(),  // Generate a unique ID using crypto
        title: req.body.title,
        content: req.body.content,
        date: new Date().toLocaleDateString(),
        author: req.body.author
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});


// Route to get a specific article by ID
router.get('/:articleId', (req, res) => {
    const article = articles.find(a => a.id === req.params.articleId);
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

// Optional: Route to update a specific article by ID
router.put('/:articleId', (req, res) => {
    const article = articles.find(a => a.id === req.params.articleId);
    if (article) {
        article.title = req.body.title || article.title;
        article.content = req.body.content || article.content;
        article.author = req.body.author || article.author;
        res.json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

// Optional: Route to delete a specific article by ID
router.delete('/:articleId', (req, res) => {
    const index = articles.findIndex(a => a.id === req.params.articleId);
    if (index !== -1) {
        const deletedArticle = articles.splice(index, 1);
        res.json(deletedArticle);
    } else {
        res.status(404).send('Article not found');
    }
});

// Route to get all comments for a specific article by article ID
router.get('/:articleId/comments', (req, res) => {
    const articleComments = comments.filter(comment => comment.articleId === req.params.articleId);
    if (articleComments.length > 0) {
        res.json(articleComments);
    } else {
        res.status(404).send('No comments found for this article');
    }
});

// Route to add a new comment to a specific article by article ID
router.post('/:articleId/comments', (req, res) => {
    const article = articles.find(a => a.id === req.params.articleId);
    if (article) {
        const newComment = {
            id: require('crypto').randomUUID(),  // Generate a unique ID using crypto
            timestamp: Math.floor(Date.now() / 1000),  // Current timestamp in seconds
            content: req.body.content,
            articleId: req.params.articleId,
            author: req.body.author
        };
        comments.push(newComment);
        res.status(201).json(newComment);
    } else {
        res.status(404).send('Article not found');
    }
});

module.exports = router;
