const exp = require('express');
const adminApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel");
const Admin = require("../models/adminModel");
const expressAsyncHandler = require("express-async-handler");

//API to get all users and authors
adminApp.get("/all-users-authors", expressAsyncHandler(async (req, res) => {
    const usersAuthors = await UserAuthor.find();
    res.status(200).send({ message: "users and authors", payload: usersAuthors });
}));

//API to enable/disable user or author
adminApp.put("/toggle-user-author/:id", expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const userAuthor = await UserAuthor.findById(id);
    if (userAuthor) {
        userAuthor.isActive = !userAuthor.isActive;
        await userAuthor.save();
        res.status(200).send({ message: "user or author status updated", payload: userAuthor });
    } else {
        res.status(404).send({ message: "user or author not found" });
    }
}));

//API to create or update admin user
adminApp.post("/admin", expressAsyncHandler(async (req, res) => {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
        return res.status(400).send({ message: "An admin already exists" });
    }
    const newAdmin = new Admin({ email: req.body.email, isActive: true });
    await newAdmin.save();
    res.status(201).send({ message: "admin created", payload: newAdmin });
}));

module.exports = adminApp;