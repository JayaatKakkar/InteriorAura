const Order = require("../Models/Order");

// @desc    Create and save a new order
// @route   POST /orders
// @access  Public
const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Validate required fields
    if (
      !orderData.userDetails?.name ||
      !orderData.userDetails?.email ||
      !orderData.productDetails?.name_prod
    ) {
       console.log(orderData)
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Validate status if provided
    if (orderData.status && !allowedStatuses.includes(orderData.status)) {
     
      return res.status(400).json({ error: "Invalid order status." });
    }

    // Optionally set default status if not provided (optional since schema defaults)
    if (!orderData.status) {
      orderData.status = "Pending";
    }

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order submitted successfully",
      orderId: savedOrder._id,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Get orders by user email
// @route   GET /orders?email=someone@example.com
// @access  Public
const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required to fetch order history." });
    }

    const orders = await Order.find({ "userDetails.email": email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetching order history failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// @desc    Get all orders (for admin)
// @route   GET /orders/all
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetching all orders failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createOrder,
  getOrdersByEmail,
  getAllOrders, 
};