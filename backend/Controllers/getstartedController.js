const Getstarted = require('../Models/getstarted');
const sendEmail=require("../utils/sendEmails")

// CREATE
exports.creategetstarted = async (req, res) => {
  try {
    const {
      name,
      email,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      mat_id,
      dim_id,
      price,
      available,
      // status,
    } = req.body;
      console.log("test",req.body)

    const getstarted = new Getstarted({
      name,
      email,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      mat_id,
      dim_id,
     price: parseFloat(price),
     
      // status,
    });

    await getstarted.save();
    await sendEmail(
      getstarted.email,
      "Your Visitor Request Status",
      `     <h3>Dear ${getstarted.name},</h3> `
      );
    res.status(201).json(getstarted);
  } catch (error) {
    console.error('Create Getstarted Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
exports.getgetstarted = async (req, res) => {
  try {
    const getstarteds = await Getstarted.find()
      .populate('parent_cat', 'name')
      .populate('sub_cat', 'name')
      .populate('sub_sub_cat', 'name')
      .populate('mat_id', 'material_name')
      .populate('dim_id', 'width height depth length');

    res.json(getstarteds);
  } catch (error) {
    console.error('Fetch Getstarted Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updategetstarted = async (req, res) => {
  try {
    const {
      name,
      email,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      mat_id,
      dim_id,
      price,
      available,
      // status,
    } = req.body;

    const updateData = {
      name,email,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      mat_id,
      dim_id,
      price: parseFloat(price),
      available: available === 'true' || available === true,
      // status,
    };

    const getstarted = await Getstarted.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!getstarted) {
      return res.status(404).json({ error: 'Getstarted not found' });
    }

    res.json(getstarted);
  } catch (error) {
    console.error('Update Getstarted Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deletegetstarted = async (req, res) => {
  try {
    const deleted = await Getstarted.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Getstarted not found' });
    }
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error('Delete Getstarted Error:', error);
    res.status(500).json({ error: error.message });
  }
};


