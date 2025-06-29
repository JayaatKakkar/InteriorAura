const Cart = require('../Models/Cart');

// Get all cart items for a specific client
exports.getCartItems = async (req, res) => {
  try {
    const { clientId } = req.params;
    const cartItems = await Cart.find({ clientId })
      .populate('vendor_id', 'name_prod vendor_image price');

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { clientId, vendor_id, quantity } = req.body;

    if (!clientId || !vendor_id || typeof quantity !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Check if item already exists
    let cartItem = await Cart.findOne({ clientId, vendor_id });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ clientId, vendor_id, quantity });
      await cartItem.save();
    }

    const populatedItem = await cartItem.populate('vendor_id', 'name_prod vendor_image price');
    res.status(cartItem.isNew ? 201 : 200).json(populatedItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Update quantity of a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.cartItemId,
      { quantity },
      { new: true }
    ).populate('vendor_id', 'name_prod vendor_image price');

    if (!updatedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.cartItemId);
    if (!deleted) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};
