const express = require('express'); 
const router = express.Router(); 
const upload = require('../middleware/upload');
const { createoffer, getoffer, updateoffer, deleteoffer } = require('../Controllers/offerController');

router.post('/', upload.single('offer_image'), createoffer); 
router.get('/', getoffer); 
router.put('/:id', upload.single('offer_image'), updateoffer); 
router.delete('/:id', deleteoffer); 

module.exports = router;
