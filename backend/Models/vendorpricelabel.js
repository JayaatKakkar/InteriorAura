const mongoose = require('mongoose'); 

const VendorpricelabelSchema = new mongoose.Schema({ 
    vendor_id: { type: String, required: true }, 
    parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // New field
    name_prod:{ type: String, required: true }, 
    mat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', default: null }, // “material is” reference
    dim_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', default: null },
    price: { type: Number, required: true }, // Changed to Number for arithmetic use
    vendor_image: { type: String, required: true }, // corresponds to plan_image
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Vendorpricelabel', VendorpricelabelSchema);
