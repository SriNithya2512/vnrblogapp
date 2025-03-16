const exp = require('express');
const authApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel");
const Admin = require("../models/adminModel");
const expressAsyncHandler = require("express-async-handler");

//API to authenticate user or author
authApp.post("/signin", expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const userAuthor = await UserAuthor.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!userAuthor && !admin) {
        return res.status(404).send({ message: "User not found" });
    }

    if (userAuthor && !userAuthor.isActive) {
        return res.status(403).send({ message: "Your account is blocked. Please contact admin" });
    }

    if (admin && !admin.isActive) {
        return res.status(403).send({ message: "Your account is blocked. Please contact admin" });
    }

    const payload = userAuthor || admin;
    res.status(200).send({ message: "signin successful", payload });
}));

module.exports = authApp;