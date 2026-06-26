const order = require('../models/orderSchema.js')

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

module.exports = {placeOrder,getOrder,getAllOrders,updateStatus}