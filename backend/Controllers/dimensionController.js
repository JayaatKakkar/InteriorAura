const Dimension = require('../Models/dimension');

// Create Dimension
exports.createdimension = async (req, res) => {
  try {
    const {
      shape_type,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      width,
      height,
      depth,
      length,
      unit,
      no_of_sheets, // <--- Added
    } = req.body;

    const dimension_image = req.file ? req.file.path : '';

    const dimension = new Dimension({
      shape_type,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      width,
      height,
      depth,
      length,
      unit,
      no_of_sheets, // <--- Added
      dimension_image,
    });

    await dimension.save();
    res.status(201).json(dimension);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Dimensions
exports.getdimension = async (req, res) => {
  try {
    const dimensions = await Dimension.find()
      .populate('parent_cat', 'name')
      .populate('sub_cat', 'name')
      .populate('sub_sub_cat', 'name');
    res.json(dimensions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getdimensions = async (req, res) => {
  try {
    const{
      subsub
    }=req.params;
   
    const dimensions = await Dimension.find({sub_sub_cat:subsub})
    res.json(dimensions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Dimension
exports.updatedimension = async (req, res) => {
  try {
    const {
      shape_type,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      width,
      height,
      depth,
      length,
      unit,
      no_of_sheets, // <--- Added
    } = req.body;

    const updateData = {
      shape_type,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      width,
      height,
      depth,
      length,
      unit,
      no_of_sheets, // <--- Added
    };

    if (req.file) {
      updateData.dimension_image = req.file.path;
    }

    const dimension = await Dimension.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(dimension);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Dimension
exports.deletedimension = async (req, res) => {
  try {
    await Dimension.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
