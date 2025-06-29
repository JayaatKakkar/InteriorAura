// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// require('dotenv').config();
// const Payment = require('../Models/Payment');
// const Order = require('../Models/Order'); // Updated schema
// const router = express.Router();

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // Create Razorpay Order
// router.post('/order', async (req, res) => {
//   const { orderId } = req.body;

//   try {
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     const amount = order.discount?.totalAfterDiscount || order.productDetails?.price || 1000;

//     const options = {
//       amount: amount * 100, // convert to paise
//       currency: 'INR',
//       receipt: crypto.randomBytes(10).toString('hex'),
//     };

//     const razorpayOrder = await razorpayInstance.orders.create(options);
//     razorpayOrder.key = process.env.RAZORPAY_KEY_ID;
//     razorpayOrder.orderId = orderId;

//     return res.status(200).json({ data: razorpayOrder, sub_amount: amount });
//   } catch (error) {
//     console.error('Order creation error:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Verify Payment and Update Order
// router.post('/verify', async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

//   try {
//     const sign = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac('sha256', process.env.RAZORPAY_SECRET)
//       .update(sign)
//       .digest('hex');

//     const isAuthentic = expectedSign === razorpay_signature;

//     if (isAuthentic) {
//       // Save payment info
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });

//       // Update order status
//       await Order.findByIdAndUpdate(orderId, { status: 'Processing' });

//       return res.json({ success: true, message: 'Payment successful and order updated' });
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalid signature' });
//     }
//   } catch (error) {
//     console.error('Payment verification error:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;
// routes/payment.js

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Payment = require('../Models/Payment');
const Order = require('../Models/Order');
const router = express.Router();

// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay Order
router.post('/order', async (req, res) => {
  const { orderid } = req.body;
 console.log(req.body)
  try {
    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const amount = order.discount?.totalAfterDiscount || order.productDetails?.price || 1000;

    const options = {
      amount: amount * 100, // Razorpay accepts paise
      currency: 'INR',
      receipt: `receipt_order_${orderid}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
        orderId: orderid, // DB order ID
      },
    });
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    return res.status(500).json({ message: 'Server error while creating Razorpay order' });
  }
});

// ✅ Verify Razorpay Payment
// router.post('/verify', async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

//   try {
//     const generatedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');

//     const isValid = generatedSignature === razorpay_signature;

//     if (!isValid) {
//       return res.status(400).json({ success: false, message: 'Signature verification failed' });
//     }

//     // Save payment info
//     await Payment.create({
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     });

//     // Update order status
//     await Order.findByIdAndUpdate(orderId, {
//       status: 'Processing',
//       paymentId: razorpay_payment_id,
//     });

//     return res.status(200).json({ success: true, message: 'Payment verified & order updated' });
//   } catch (error) {
//     console.error('Payment verification failed:', error);
//     return res.status(500).json({ message: 'Server error during verification' });
//   }
// });
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Signature verification failed' });
    }

    // Save payment info
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // ✅ Update order status to "Paid"
    await Order.findByIdAndUpdate(orderId, {
      status: 'Paid',
      paymentId: razorpay_payment_id,
    });

    return res.status(200).json({ success: true, message: 'Payment verified & order marked as Paid' });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return res.status(500).json({ message: 'Server error during verification' });
  }
});


module.exports = router;
