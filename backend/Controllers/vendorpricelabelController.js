const Vendorpricelabel = require('../Models/vendorpricelabel');

// Create a new vendor price label (with image upload)
exports.createvendorpricelabel = async (req, res) => {
    try {
        const {
            vendor_id,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            name_prod,
            mat_id,
            dim_id,
            price,
        } = req.body;

        const vendor_image = req.file ? req.file.path : '';

        const vendorpricelabel = new Vendorpricelabel({
            vendor_id,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            name_prod,
            mat_id,
            dim_id,
            price,
            vendor_image,
        });

        await vendorpricelabel.save();
        res.status(201).json(vendorpricelabel);
    } catch (error) {
        console.error("Error creating vendor price label:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all vendor price labels
exports.getvendorpricelabel = async (req, res) => {
    try {
        const vendorpricelabels = await Vendorpricelabel.find()
            .populate('parent_cat', 'name')
            .populate('sub_cat', 'name')
            .populate('sub_sub_cat', 'name')
            .populate('mat_id', 'material_name material_image')
            .populate('dim_id', 'width height depth length');

        res.json(vendorpricelabels);
    } catch (error) {
        console.error("Error fetching all vendor price labels:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single vendor price label by ID
exports.getVendorPriceLabelById = async (req, res) => {
    try {
        const vendorpricelabel = await Vendorpricelabel.findById(req.params.id)
            .populate('parent_cat', 'name')
            .populate('sub_cat', 'name')
            .populate('sub_sub_cat', 'name')
            .populate('mat_id', 'material_name material_image')
            .populate('dim_id', 'width height depth length');

        if (!vendorpricelabel) {
            return res.status(404).json({ error: 'Vendor price label not found' });
        }

        res.json(vendorpricelabel);
    } catch (error) {
        console.error("Error fetching vendor price label by ID:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update a vendor price label by ID
exports.updatevendorpricelabel = async (req, res) => {
    try {
        const {
            vendor_id,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            name_prod,
            mat_id,
            dim_id,
            price,
        } = req.body;

        const updateData = {
            vendor_id,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            name_prod,
            mat_id,
            dim_id,
            price,
        };

        if (req.file) {
            updateData.vendor_image = req.file.path;
        }

        const updated = await Vendorpricelabel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Vendor price label not found' });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error updating vendor price label:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a vendor price label by ID
exports.deletevendorpricelabel = async (req, res) => {
    try {
        await Vendorpricelabel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error("Error deleting vendor price label:", error);
        res.status(500).json({ error: error.message });
    }
};

// Filter vendor price labels based on categories
// Filter vendor price labels based on categories
exports.filterVendorPriceLabels = async (req, res) => {
    const { parentCategory, subCategory, subSubCategory } = req.body;

    console.log('Received filter data:', { parentCategory, subCategory, subSubCategory });

    try {
        const filters = {};
        if (parentCategory) filters.parent_cat = parentCategory;
        if (subCategory) filters.sub_cat = subCategory;
        if (subSubCategory) filters.sub_sub_cat = subSubCategory;

        const filteredVendorLabels = await Vendorpricelabel.find(filters)
            .populate('parent_cat', 'name')
            .populate('sub_cat', 'name')
            .populate('sub_sub_cat', 'name')
            .populate('mat_id', 'material_name material_image')
            .populate('dim_id', 'width height depth length');

        if (filteredVendorLabels.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No vendor price labels found for the given criteria.'
            });
        }

        res.json({ success: true, vendorDetails: filteredVendorLabels });
    } catch (error) {
        console.error("Error filtering vendor price labels:", error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while filtering vendor price labels.',
            error: error.message
        });
    }
};

// Get related products (same parent category, different ID)
// Get related products (same sub-sub-category, different ID)
exports.getRelatedProducts = async (req, res) => {
    try {
        const current = await Vendorpricelabel.findById(req.params.id);

        if (!current) {
            return res.status(404).json({ message: 'Vendor price label not found' });
        }

        const related = await Vendorpricelabel.find({
            _id: { $ne: current._id },
            sub_sub_cat: current.sub_sub_cat
        })
            .limit(5)
            .populate('parent_cat', 'name')
            .populate('sub_cat', 'name')
            .populate('sub_sub_cat', 'name')
            .populate('mat_id', 'material_name material_image')
            .populate('dim_id', 'width height depth length');

        res.json(related);
    } catch (error) {
        console.error("Error fetching related products:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
