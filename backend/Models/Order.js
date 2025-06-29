const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    hnono: String,
    street: String,
    address: String,
    pincode: String,
  },
  productDetails: {
    name_prod: { type: String, required: true },
    price: { type: Number, required: true },
    vendor_image: String,
    parent_cat: {
      name: String,
    },
  },
  discount: {
    couponCode: { type: String, default: "" },
    discountPercent: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    gst: { type: Number, required: true },
    price: { type: Number, required: true },
    totalBeforeDiscount: { type: Number, required: true },
    totalAfterDiscount: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled","Paid"],
    default: "Pending",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
