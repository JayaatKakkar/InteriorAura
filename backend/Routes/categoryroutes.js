const express = require('express');
const Category = require('../Models/category');

const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
  
  try {
    const categoryData = { ...req.body };

    // Convert "0" string to null for parent_cat, sub_cat, and sub_sub_cat
    if (categoryData.parent_cat === '0') categoryData.parent_cat = null;
    if (categoryData.sub_cat === '0') categoryData.sub_cat = null;
    if (categoryData.sub_sub_cat === '0') categoryData.sub_sub_cat = null;

    const category = new Category(categoryData);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all categories (populating parent, subcategories, and sub-subcategories)
router.get('/', async (req, res) => {
  console.log("text")
  try {
    const categories = await Category.find()
      .populate('parent_cat',"name")
      .populate('sub_cat',"name") 
      .populate('sub_sub_cat',"name"); // Populating subcategories and sub-subcategories
    res.json(categories);
  } catch (err) {
    console.log("text")
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Get all Parent Categories (only parent_cat = null)
router.get('/parents', async (req, res) => {
   
  try {
    const parents = await Category.find({ parent_cat: null });
    res.json(parents);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching parent categories' });
  }
});

// Get Subcategories of a specific parent (parent_cat ≠ null && sub_cat = null)
router.get('/subs/:parentId', async (req, res) => {
  try {
    const subCategories = await Category.find({
      parent_cat: req.params.parentId,
      sub_cat: null,
    }).populate('sub_cat sub_sub_cat'); // Populate sub-subcategories as well
    res.json(subCategories);
    console.log(subCategories)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching subcategories' });
  }
});

// Get Sub-Subcategories of a specific subcategory
router.get('/subsubs/:subCategoryId', async (req, res) => {
  try {
    const subSubCategories = await Category.find({
      sub_cat: req.params.subCategoryId,
    }).populate('sub_sub_cat'); // Populate sub-subcategories
    res.json(subSubCategories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sub-subcategories' });
  }
});

// Get a single category (with populated parent_cat, sub_cat, and sub_sub_cat)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent_cat sub_cat sub_sub_cat'); // Populate all nested categories
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching category' });
  }
});

// Update category (with subcategories and sub-subcategories)
router.put('/:id', async (req, res) => {
  try {
    const categoryData = { ...req.body };

    // Convert "0" string to null for parent_cat, sub_cat, and sub_sub_cat
    if (categoryData.parent_cat === '0') categoryData.parent_cat = null;
    if (categoryData.sub_cat === '0') categoryData.sub_cat = null;
    if (categoryData.sub_sub_cat === '0') categoryData.sub_sub_cat = null;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      categoryData,
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});

module.exports = router;


