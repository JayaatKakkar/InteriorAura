const mongoose = require('mongoose');

const ArchitectSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, unique: true, required: true },
  password:   { type: String, required: true },
  mobile_no:  { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending"
  },
  resetToken:        { type: String }, 
  resetTokenExpiry:  { type: Date }    
});

const ArchitectModel = mongoose.model("Architect", ArchitectSchema);

module.exports = ArchitectModel;
