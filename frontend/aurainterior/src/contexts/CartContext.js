import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const user = localStorage.getItem('user');
  const clientId = user ? JSON.parse(user)?.id : null;

  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      if (clientId) {
        try {
          // Fetch all cart items for this client, with vendor_id populated with name_prod, vendor_image, price
          const res = await axios.get(`https://interioraura.onrender.com/api/cart/${clientId}`);
          if (isMounted && Array.isArray(res.data)) {
            setCartItems(res.data);
          } else {
            setCartItems([]);
          }
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCart();

    return () => { isMounted = false; };
  }, [clientId]);

  // Add item or update quantity if exists
  const addToCart = async (vendorLabelId, quantity) => {
    if (!clientId || !vendorLabelId || quantity <= 0) return;

    try {
      const existingItem = cartItems.find(item => item.vendor_id?._id === vendorLabelId);

      if (existingItem) {
        // Update existing quantity on server
        const newQty = existingItem.quantity + quantity;
        const res = await axios.put(`https://interioraura.onrender.com/api/cart/${existingItem._id}`, { quantity: newQty });
        // Update local state with returned populated item
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === existingItem._id ? res.data : item
          )
        );
      } else {
        // Add new item to cart
        const res = await axios.post("https://interioraura.onrender.com/api/cart", {
          clientId,
          vendor_id: vendorLabelId,
          quantity,
        });
        setCartItems((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Update quantity of an item or remove if 0 or less
  const updateQuantity = async (cartId, newQty) => {
    if (newQty <= 0) return removeItem(cartId);

    try {
      const res = await axios.put(`https://interioraura.onrender.com/api/cart/${cartId}`, { quantity: newQty });

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === cartId ? res.data : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item from cart
  const removeItem = async (cartId) => {
    try {
      await axios.delete(`https://interioraura.onrender.com/api/cart/${cartId}`);

      setCartItems((prev) => prev.filter((item) => item._id !== cartId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
