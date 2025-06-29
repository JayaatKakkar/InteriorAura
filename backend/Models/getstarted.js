// // const mongoose = require('mongoose');

// // const GetstartedSchema = new mongoose.Schema({
// //   // name: { type: String, required: true },        // Added name field
// //   // email: { type: String, required: true },       // Added email field
// //   parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
// //   sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
// //   sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
// //   mat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', default: null },
// //   dim_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', default: null },
// //   price: { type: Number, required: true },
// //   available: { type: Boolean, default: true },
// //   // getstarted_image: { type: String }, // Optional
// //   status: { type: String, enum: ['active', 'inactive'], default: 'active' },
// //   createdAt: { type: Date, default: Date.now }
// // });

// // module.exports = mongoose.model('Getstarted', GetstartedSchema);

// const mongoose = require('mongoose');

// const GetstartedSchema = new mongoose.Schema({
//   // name: { type: String, required: true },        // Uncomment if needed
//   // email: { type: String, required: true },       // Uncomment if needed
//   parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
//   sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
//   sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
//   mat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', default: null },
//   dim_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', default: null },
//   price: { type: Number, required: true, min: 0 }, // added min to prevent negative price
//   available: { type: Boolean, default: true },
//   // getstarted_image: { type: String }, // Optional image URL or path
//   status: { type: String, enum: ['active', 'inactive'], default: 'active' },
//   createdAt: { type: Date, default: Date.now }
// });

// // Optional: Add indexes if you'll query often by these fields
// // GetstartedSchema.index({ parent_cat: 1 });
// // GetstartedSchema.index({ status: 1 });

// module.exports = mongoose.model('Getstarted', GetstartedSchema);
const mongoose = require('mongoose');

const GetstartedSchema = new mongoose.Schema({
  name:{ type: String, required: true }, 
  email:{ type: String, required: true }, 
  parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  mat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', default: null },
  dim_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', default: null },
  price: { type: Number, min: 0 },
  available: { type: Boolean, default: true },
  // status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Getstarted', GetstartedSchema);

