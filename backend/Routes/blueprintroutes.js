  const express = require('express'); 
  const router = express.Router(); 
  const upload = require('../middleware/blueprint_upload');
  const {
    createblueprint,
    getblueprint,
    updateblueprint,
    deleteblueprint
  } = require('../Controllers/blueprintController');

  // 🔸 Create a new blueprint (with image upload)
  router.post('/', upload.single('blueprint_image'), createblueprint);

  // 🔸 Get all blueprints
  router.get('/', getblueprint);

  // 🔸 Update a blueprint by ID (with optional image)
  router.put('/:id', upload.single('blueprint_image'), updateblueprint);

  // 🔸 Delete a blueprint by ID
  router.delete('/:id', deleteblueprint);

  module.exports = router;
