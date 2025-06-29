const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

// Get cart items for a client
router.get('/:clientId', cartController.getCartItems);

// Add item to cart
router.post('/', cartController.addToCart);

// Update quantity
router.put('/:cartItemId', cartController.updateCartItem);

// Delete item from cart
router.delete('/:cartItemId', cartController.deleteCartItem);

module.exports = router;
