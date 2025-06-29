const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendorpricelabel', required: true },
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
