const mongoose = require('mongoose')

//definne
const adminSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true 
    },
    firstName:{
        type:String,
        required:true 
    },
    lastName:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    profileImageUrl:{
        type:String 
    }
},{"strict":"throw"})

//construct
const Admin = mongoose.model("admin",adminSchema)

//export
module.exports = Admin;