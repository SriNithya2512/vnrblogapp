const exp = require('express')
const adminApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const createAdmin = require('../APIs/createAdmin')
const UserAuthor = require('../models/userAuthorModel')
const Article = require('../models/articleModel')
const Admin = require("../models/adminModel");

//create new admin
adminApp.post('/admin',expressAsyncHandler(createAdmin))

// read all users & authors
adminApp.get("/users",expressAsyncHandler(async (req , res)=>{
    const user = await UserAuthor.find();
    res.send({payload:user})
}))

//Get a specific user by ID 
adminApp.get('/users/:id',expressAsyncHandler(async(req,res)=>{
    const user = await UserAuthor.findById(req.params.id);
    if (!user) {
        return res.status(404).send({message:"User not found"})
    }
    res.send({message:"user",payload:user})
}))

// change the isActive property
adminApp.put("/users/:id",expressAsyncHandler(async (req,res)=>{
    const {isActive} = req.body;
    const user = await UserAuthor.findByIdAndUpdate(req.params.id,{isActive},{new:true})

    if (!user) {
        return res.status(404).send({message:"User not found",payload:user})
    }

    res.send({message:"User status updated successfully"})
}))

adminApp.get("/categories",expressAsyncHandler(async (req,res)=>{
    const categories = await Article.distinct("category");
    res.send({payload:categories})
}))

module.exports = adminApp;