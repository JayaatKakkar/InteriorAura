const express = require('express'); 
const router = express.Router(); 
const upload = require('../middleware/vendorlabelprice_upload');
const {
  createvendorpricelabel,
  getvendorpricelabel,
  getVendorPriceLabelById,      // new controller import
  updatevendorpricelabel,
  deletevendorpricelabel,
  filterVendorPriceLabels,
  getRelatedProducts
} = require('../Controllers/vendorpricelabelController');

// Create a new vendor price label (with image upload)
router.post('/', upload.single('vendor_image'), createvendorpricelabel);

// Get all vendor price labels
router.get('/', getvendorpricelabel);

// Get a single vendor price label by ID  <----- NEW ROUTE
router.get('/:id', getVendorPriceLabelById);
router.get('/related/:id',  getRelatedProducts);

// Update a vendor price label by ID (with optional image)
router.put('/:id', upload.single('vendor_image'), updatevendorpricelabel);

// Delete a vendor price label by ID
router.delete('/:id', deletevendorpricelabel);

// Filter vendor price labels based on selected categories
router.post('/filter', filterVendorPriceLabels);

// Example route: GET /materials
router.get("/materials", async (req, res) => {
  try {
    const materials = await Material.find().populate("parent_cat sub_cat sub_sub_cat");
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
