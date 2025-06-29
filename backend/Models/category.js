// // model/Category.js
// const mongoose = require('mongoose');

// const CategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   desc: { type: String },
//   parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
//   sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
//   status: { type: String, enum: ['active', 'inactive'], default: 'active' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Category', CategorySchema);



// model/Category.js
// const mongoose = require('mongoose');

// const CategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   desc: { type: String },
//   parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
//   sub_cat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],  // Subcategories
//   sub_sub_cat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],  // Sub-subcategories
//   status: { type: String, enum: ['active', 'inactive'], default: 'active' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Category', CategorySchema);

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  sub_cat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],  // Subcategories
  sub_sub_cat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],  // Sub-subcategories
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);

