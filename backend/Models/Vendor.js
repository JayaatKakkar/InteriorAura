const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, unique: true, required: true },
  password:   { type: String, required: true },
  mobile_no:  { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending"
  },
  resetToken:       { type: String }, // optional
  resetTokenExpiry: { type: Date }    // optional
});

const VendorModel = mongoose.model("Vendor", VendorSchema);

module.exports = VendorModel;
