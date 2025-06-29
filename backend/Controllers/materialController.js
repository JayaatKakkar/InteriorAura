const Material = require('../Models/material');

// Create Material
exports.creatematerial = async (req, res) => {
    try {
        const {
            material_name,
            material_quality,
            material_price,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            submittedby,
            submittedbyname
        } = req.body;

        const material_image = req.file ? req.file.path : '';

        const material = new Material({
            material_name,
            material_quality,
            material_price,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            submittedby,
            submittedbyname,
            material_image
        });

        await material.save();
        res.status(201).json(material);
    } catch (error) {
        console.error('Create Material Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get All Materials
exports.getmaterial = async (req, res) => {
    try {
        const materials = await Material.find()
            .populate('parent_cat', 'name')
            .populate('sub_cat', 'name')
            .populate('sub_sub_cat', 'name');

        res.json(materials);
    } catch (error) {
        console.error('Get Material Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get Materials by Sub-Sub-Category ID
exports.getmaterials = async (req, res) => {
    try {
        const { subsub } = req.params;

        const materials = await Material.find({ sub_sub_cat: subsub });

        if (!materials.length) {
            return res.status(404).json({ message: 'No materials found for this sub-sub-category.' });
        }

        res.json(materials);
    } catch (error) {
        console.error('Get Materials by SubSubCat Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update Material by ID
exports.updatematerial = async (req, res) => {
    try {
        const {
            material_name,
            material_quality,
            material_price,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            submittedby,
            submittedbyname
        } = req.body;

        const updateData = {
            material_name,
            material_quality,
            material_price,
            parent_cat,
            sub_cat,
            sub_sub_cat,
            submittedby,
            submittedbyname
        };

        if (req.file) {
            updateData.material_image = req.file.path;
        }

        const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedMaterial) {
            return res.status(404).json({ error: 'Material not found' });
        }

        res.json(updatedMaterial);
    } catch (error) {
        console.error('Update Material Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete Material by ID
exports.deletematerial = async (req, res) => {
    try {
        const deleted = await Material.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Material not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Delete Material Error:', error);
        res.status(500).json({ error: error.message });
    }
};
