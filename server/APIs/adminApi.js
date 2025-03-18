const exp = require('express');
const adminApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const createAdmin = require('./createAdmin');
const UserAuthor = require('../models/userAuthorModel');
const Article = require("../models/articleModel");

//API
adminApp.get("/", (req, res) => {
    res.send({ message: "from admin api" });
});

adminApp.post('/admin', expressAsyncHandler(createAdmin));

// Read all users & authors
adminApp.get("/users", expressAsyncHandler(async (req, res) => {
    const users = await UserAuthor.find();
    res.send({ payload: users });
}));

adminApp.get("/categories", expressAsyncHandler(async (req, res) => {
    const categories = await Article.distinct("category");
    res.send({ payload: categories });
}));

module.exports = adminApp;