const Offer = require('../Models/offer'); 

exports.createoffer = async (req, res) => { 
    try {
        const { offer_name,  starting_date ,end_date,offer_code,offer_percentage} = req.body;
        const offer_image = req.file ? req.file.path : '';
        const offer = new Offer({offer_name,  starting_date ,end_date,offer_code,offer_percentage,offer_image });
        await offer.save(); 
        res.status(201).json(offer); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getoffer = async (req, res) => { 
    try {
        const offers = await Offer.find(); 
        res.json(offers); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateoffer = async (req, res) => { 
    try {
        const { offer_name, starting_date ,end_date,offer_code,offer_percentage} = req.body;
        const updateData = { offer_name,  starting_date ,end_date,offer_code,offer_percentage };
        if (req.file) {
            updateData.offer_image = req.file.path;
        }
        const offer = await Offer.findByIdAndUpdate(req.params.id, updateData, { new: true }); 
        res.json(offer); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteoffer = async (req, res) => { 
    try {
        await Offer.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Deleted Successfully' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
