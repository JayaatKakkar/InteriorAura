const mongoose = require('mongoose'); 

const PackageSchema = new mongoose.Schema({ 
    package_name: { type: String, required: true }, 
    package_donationmonth: { type: String, required: true },
    package_details:{ type: String, required: true },
    package_plan: { type: String, required: true },
    package_price: { type: Number, required: true }, 
    package_image: { type: String, required: true }
}, { timestamps: true }); 

module.exports = mongoose.model('Package', PackageSchema);
