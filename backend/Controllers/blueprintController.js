const Blueprint = require('../Models/blueprint'); 
exports.createblueprint = async (req, res) => { 
    try {
        const {
            parent_cat,
            sub_cat,
            sub_sub_cat, // Add if you use it
            mat_id,
            dim_id,
            price,
            available,
            // description_id
        } = req.body;

        const blueprint_image = req.file ? req.file.path : '';

        const blueprint = new Blueprint({
            parent_cat,
            sub_cat,
            sub_sub_cat, // include if your model uses it
            mat_id,
            dim_id,
            price,
            available,
            blueprint_image,
            // description_id
        });

        await blueprint.save(); 
        res.status(201).json(blueprint); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.getblueprint = async (req, res) => { 
    try {
        const blueprints = await Blueprint.find()
            .populate('parent_cat', 'name')
            .populate('sub_cat', 'name')
            .populate('sub_sub_cat', 'name')
            .populate('mat_id', 'material_name')
            .populate('dim_id', 'width height depth length')
            // .populate('sub_sub_cat', 'name') // if used
            console.log(blueprints)
        res.json(blueprints); 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};


exports.updateblueprint = async (req, res) => { 
    try {
        const {
            parent_cat,
            sub_cat,
            sub_sub_cat,
            mat_id,
            dim_id,
            price,
            available,
            // description_id
        } = req.body;

        const updateData = {
            parent_cat,
            sub_cat,
            sub_sub_cat,
            mat_id,
            dim_id,
            price,
            available,
            // description_id
        };

        if (req.file) {
            updateData.blueprint_image = req.file.path;
        }

        const blueprint = await Blueprint.findByIdAndUpdate(req.params.id, updateData, { new: true }); 

        if (!blueprint) return res.status(404).json({ error: 'Blueprint not found' });

        res.json(blueprint); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteblueprint = async (req, res) => { 
    try {
        await Blueprint.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Deleted Successfully' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
