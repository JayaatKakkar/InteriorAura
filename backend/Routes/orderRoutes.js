const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByEmail ,getAllOrders } = require("../Controllers/ordersController");

router.post("/", createOrder);
router.get("/orders", getOrdersByEmail);
router.get("/all", getAllOrders);

module.exports = router;
