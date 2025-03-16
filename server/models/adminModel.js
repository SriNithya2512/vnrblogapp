const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;