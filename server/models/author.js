const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Author', authorSchema);