const express = require('express');
const router = express.Router();
const db = require('../db');  // Import db.js

// Destructure articles and comments from db
const { articles, comments } = db;

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   date:
 *                     type: string
 *                   author:
 *                     type: string
 */
router.get('/', (req, res) => {
    res.json(articles);
});


/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 date:
 *                   type: string
 *                 author:
 *                   type: string
 */
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

/**
 * @swagger
 * /articles/{articleId}:
 *   get:
 *     summary: Get a specific article by ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 date:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: Article not found
 */
router.get('/:articleId', (req, res) => {
    const article = articles.find(a => a.id === req.params.articleId);
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

/**
 * @swagger
 * /articles/{articleId}:
 *   put:
 *     summary: Update a specific article by ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated article
 *       404:
 *         description: Article not found
 */
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

/**
 * @swagger
 * /articles/{articleId}:
 *   delete:
 *     summary: Delete a specific article by ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted article
 *       404:
 *         description: Article not found
 */
router.delete('/:articleId', (req, res) => {
    const index = articles.findIndex(a => a.id === req.params.articleId);
    if (index !== -1) {
        const deletedArticle = articles.splice(index, 1);
        res.json(deletedArticle);
    } else {
        res.status(404).send('Article not found');
    }
});

/**
 * @swagger
 * /articles/{articleId}/comments:
 *   get:
 *     summary: Get all comments for a specific article by article ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article to get comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   timestamp:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   articleId:
 *                     type: string
 *                   author:
 *                     type: string
 *       404:
 *         description: No comments found for this article
 */
router.get('/:articleId/comments', (req, res) => {
    const articleComments = comments.filter(comment => comment.articleId === req.params.articleId);
    if (articleComments.length > 0) {
        res.json(articleComments);
    } else {
        res.status(404).send('No comments found for this article');
    }
});

/**
 * @swagger
 * /articles/{articleId}/comments:
 *   post:
 *     summary: Add a new comment to a specific article by article ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created comment
 *       404:
 *         description: Article not found
 */
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
