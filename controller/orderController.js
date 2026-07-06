const order = require('../models/orderSchema.js')
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

async function placeOrder(req,res) {
    try{
        let Order = await order.create(req.body)
        return res.status(200).json("Order Placed")
    }catch(err){
        return res.status(401).json(err.message)
    }
}

async function getOrder(req,res) {
    try{
        let Orders = await order.find({userId:req.params.userId}).populate('productId')
        return res.status(200).json(Orders)
    }catch(err){
        return res.status(401).json(err)
    }
}

async function getAllOrders(req,res) {
    try{
        let orders = await order.find().populate('productId').populate("userId")
        return res.status(200).json(orders)
    }catch(err){
        return res.status(401).json(err)
    }
}

async function updateStatus(req,res) {
    try{
        await order.findByIdAndUpdate(req.params.id,{status:req.body.status})
        return res.status(200).json("Status Updated")
    }catch(err){
        return res.status(401).json(err)
    }
}

async function createRazorpayOrder(req, res) {
    try {

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        let razorpayOrder = await razorpay.orders.create(options);

        return res.status(200).json(razorpayOrder);

    } catch (err) {

        return res.status(500).json(err.message);

    }
}

async function verifyPayment(req, res) {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {

            return res.status(200).json({
                success: true,
                message: "Payment Verified"
            });

        } else {

            return res.status(400).json({
                success: false,
                message: "Invalid Signature"
            });

        }

    } catch (err) {

        return res.status(500).json(err.message);

    }

}


module.exports = {placeOrder,getOrder,getAllOrders,updateStatus,createRazorpayOrder,verifyPayment}