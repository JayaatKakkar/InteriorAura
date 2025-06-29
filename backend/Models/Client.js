 const mongoose = require('mongoose')

 const ClientSchema = new mongoose.Schema({
    name:String,
    email: { type: String, unique: true },
    password:String,
    mobile_no:String,
    resetToken: String,
    resetTokenExpiry: Date
 })

 const ClientModel = mongoose.model("Client", ClientSchema)
 
 module.exports = ClientModel