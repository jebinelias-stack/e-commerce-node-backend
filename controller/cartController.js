const cart = require('../models/cartSchema.js')


async function addCart(req,res) {
    try{
        await cart.create(req.body)
        return res.status(200).json(true)
    }catch(err){
        return res.status(401).json(err)
    }
}

async function getCart(req,res) {
    try{
        let cartItems = await cart.find({userId:req.params.userId}).populate ('productId')
        return res.status(200).json(cartItems)
    }catch(err){
        return res.status(401).json(err)
    }
}


async function deleteCart(req,res) {
    try{
        console.log(req.params);
        
        await cart.findByIdAndDelete(req.params.cartId)
        return res.status(200).json("Data deleted")
    }catch(err){
        return res.status(401).json(err)
    }
    
}


async function increaseQuantity(req,res) {
    try{
        let item = await cart.findById(req.params.id)
        item.quantity += 1
        await item.save()
        return res.status(200).json(item)
    }catch(err){
        return res.status(401).json(err)
    }
}

async function decreaseQuantity(req,res) {
    try{
        let item = await cart.findById(req.params.id)
         if(item.quantity > 1){
            item.quantity -= 1
            await item.save()
        }
        return res.status(200).json(item)
    }catch(err){
        return res.status(401).json(err)
    }
}

module.exports = {addCart,deleteCart,getCart,increaseQuantity,decreaseQuantity}