const mongoose = require('mongoose')

const orderData = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: "user"},
  productId: {type: mongoose.Schema.Types.ObjectId,ref: "product"},
  quantity: {type:Number,default:1},
  totalAmount: {type:Number},
  fullname: {type:String},
  phone: {type:String},
  address: {type:String},
  city: {type:String},
  pincode: {type:String},
  status: {type: String,default: "Placed"}
});

module.exports = mongoose.model("order", orderData);