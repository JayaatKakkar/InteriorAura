const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // mobile_no: { type: String, required: true },
  resetToken: { type: String }, 
  resetTokenExpiry: { type: Date } 
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
