const mongoose = require('mongoose');

const DimensionSchema = new mongoose.Schema({
  shape_type: String,
  parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  width: String,
  height: String,
  depth: String,
  length: String,
  unit: String,
  no_of_sheets: { type: Number, required: true }, // <-- Added this line
  dimension_image: String,
});

module.exports = mongoose.model('Dimension', DimensionSchema);
