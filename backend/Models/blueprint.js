const mongoose = require('mongoose');

const BlueprintSchema = new mongoose.Schema({
  parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }, // newly added for sub-sub category
  mat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', default: null }, // “material is” reference
  dim_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', default: null },
  price: { type: Number, required: true }, // Changed to Number for arithmetic use
  available: { type: Boolean, default: true }, // More appropriate than string
  blueprint_image: { type: String, required: true }, // corresponds to plan_image
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blueprint', BlueprintSchema);
