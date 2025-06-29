const Package = require('../Models/package'); 

exports.createpackage = async (req, res) => { 
    console.log(req.body)
    try {
        const { package_name,  package_donationmonth ,package_details, package_plan, package_price} = req.body;
        const package_image = req.file ? req.file.path : '';
        const package = new Package({ package_name,  package_donationmonth ,package_details, package_plan, package_price,package_image});
        await package.save(); 
        res.status(201).json(package); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getpackage = async (req, res) => { 
    try {
        const packages = await Package.find(); 
        res.json(packages); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatepackage = async (req, res) => { 
    try {
        const { package_name,  package_donationmonth ,package_details, package_plan, package_price} = req.body;
        const updateData = {package_name,  package_donationmonth ,package_details, package_plan, package_price };
        if (req.file) {
            updateData.package_image = req.file.path;
        }
        const package = await Package.findByIdAndUpdate(req.params.id, updateData, { new: true }); 
        res.json(package); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletepackage = async (req, res) => { 
    try {
        await Package.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Deleted Successfully' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
