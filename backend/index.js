const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const offerRoutes = require('./Routes/offerRoutes');
const DimentionRoutes = require("./Routes/dimensionroutes");
const blueprintRoutes = require("./Routes/blueprintroutes");
const getstartedRoutes = require("./Routes/getstartedroutes");
const vendorlabelpriceRoutes = require("./Routes/vendorpricelabelroutes");
const authRoutes = require("./Routes/admin_authRoutes");
const vendor_authRoutes = require("./Routes/vendor_authRoutes");
const architect_authRoutes = require("./Routes/architect_authRoutes");
const client_authRoutes = require("./Routes/client_authRoutes");
const CategoryRoutes = require("./Routes/categoryRoutes");
const materialRoutes = require('./Routes/materialRoutes'); 
const packageRoutes = require('./Routes/packageRoutes'); 
const appointmentRoutes = require('./Routes/appointmentRoutes'); 
const architectprofileRoutes = require("./Routes/architectprofileroutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRoutes= require("./Routes/orderRoutes");
const payment=require('./Routes/payment')

const nodemailer = require("nodemailer");
const path = require('path');

const app = express();

// Middleware
app.use(cors({credential:true}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log('MongoDB Connected')) 
  .catch(err => console.log(err)); 
// app.get('/', (req, res) => {
//     res.send('Razorpay Payment Gateway Using React And Node Js')
// });

// app.use('/', express.static(path.join(__dirname, '../frontend/aurainterior/build')));
// app.use('/vendor', express.static(path.join(__dirname, '../frontend/vendorapp/build')));
// app.use('/staff', express.static(path.join(__dirname, '../frontend/staffapp/build')));

// app.use('/admin', express.static(path.join(__dirname, '../frontend/adminapp/build')));
// app.get('/admin/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/adminapp/build/index.html'));
// });
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/aurainterior/build/index.html'));
// });
// app.get('/vendor/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/vendorapp/build/index.html'));
// });
// app.get('/staff/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/staffapp/build/index.html'));
// });
//Serve static builds
app.use('/admin', express.static(path.join(__dirname, '../frontend/adminapp/build')));
app.use('/vendor', express.static(path.join(__dirname, '../frontend/vendorapp/build')));
app.use('/staff', express.static(path.join(__dirname, '../frontend/staffapp/build')));
app.use('/user', express.static(path.join(__dirname, '../frontend/aurainterior/build')));

// Route for admin
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/adminapp/build/index.html'));
});

// Route for vendor
app.get('/vendor/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/vendorapp/build/index.html'));
});

// Route for staff
app.get('/staff/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/staffapp/build/index.html'));
});

// ✅ Route for main site — this must come LAST
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/aurainterior/build/index.html'));
});
// Routes
app.use('/api/category', CategoryRoutes);  
app.use('/Offer', offerRoutes);
app.use('/Dimension', DimentionRoutes);
app.use('/Appointment', appointmentRoutes);
app.use('/Blueprint', blueprintRoutes);
app.use('/Getstarted',  getstartedRoutes);
app.use('/Vendorlabelprice', vendorlabelpriceRoutes);
app.use('/Architectprofile', architectprofileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/architect_auth", architect_authRoutes);
app.use("/api/vendor_auth", vendor_authRoutes);
app.use("/api/client", client_authRoutes);
app.use('/Material', materialRoutes); 
app.use('/packs', packageRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/orders',orderRoutes);
app.use('/api/payment', payment);



// Error handling for unrecognized routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Internal Server Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Server setup
app.listen(5000, () => console.log('Server running on port 5000'));
