const exp = require('express');
const userApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel");
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserOrAuthor");
const Article = require("../models/articleModel");

//API

//create new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor));

//add comment
userApp.put('/comment/:articleId', expressAsyncHandler(async (req, res) => {
    //get comment obj
    const commentObj = req.body;
    console.log(commentObj, req.params.articleId);
    //add commentObj to comments array of article
    const articleWithComments = await Article.findOneAndUpdate(
        { articleId: req.params.articleId },
        { $push: { comments: commentObj } },
        { returnOriginal: false }
    );

    console.log(articleWithComments);
    //send res
    res.status(200).send({ message: "comment added", payload: articleWithComments });
}));

//get articles by category
userApp.get('/articles/:category', expressAsyncHandler(async (req, res) => {
    const { category } = req.params;
    const articles = await Article.find({ category });
    res.status(200).send({ message: "articles fetched", payload: articles });
}));

module.exports = userApp;