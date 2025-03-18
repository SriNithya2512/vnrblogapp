const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Get articles by category
router.get('/category/:category', async (req, res) => {
    try {
        const articles = await Article.find({ category: req.params.category });
        res.json(articles);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;