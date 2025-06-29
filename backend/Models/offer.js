const mongoose = require('mongoose'); 

const OfferSchema = new mongoose.Schema({ 
    offer_name: { type: String, required: true }, 
    starting_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    offer_code: { type: String, required: true },
    offer_percentage: { type: Number, required: true }, 
    offer_image: { type: String, required: true }
}, { timestamps: true }); 

module.exports = mongoose.model('Offer', OfferSchema);
