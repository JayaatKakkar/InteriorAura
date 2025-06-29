const mongoose = require('mongoose'); 

const MaterialSchema = new mongoose.Schema({ 
    material_name: { type: String, required: true }, 
    material_quality: { type: String, required: true }, 
    material_price: { type: String, required: true }, 
    material_image: { type: String, required: true }, 
    parent_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    sub_sub_cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // New field
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    submittedby:{ type:String, required: true },
    submittedbyname:{ type:String, required: true }
}, { timestamps: true }); 

module.exports = mongoose.model('Material', MaterialSchema);
