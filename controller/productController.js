const product = require('../models/productSchema')

async function addProduct (req,res) {
    try{
        await product.create(req.body)
        return res.status(200).json("Product Added")
    }catch(err){
        return res.status(401).json(err)
    }
}

async function getProduct(req,res) {
    try{
        let DataBaseData = await product.find()
        return res.status(200).json({ProductDetails:DataBaseData})
    }catch(err){
        return res.status(401).json(err)
    }
}

async function getSingleProduct(req,res) {
    try{
       let DataBaseData = await product.findById(req.params.id)
       return res.status(200).json({ProductDetails:DataBaseData})
    }catch(err){
        return res.status(401).json(err)
    }
}

async function deleteProduct(req,res) {
    try{
        await product.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product Deleted")
    }catch(err){
        return res.status(401).json(err)
    }
}

async function updateProduct(req,res) {
    try{
        await product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.status(200).json("Prodcut Updated")
    }catch(err){
        console.log(err);
        
        return res.status(401).json(err)
    }    
}


module.exports ={addProduct,getProduct,getSingleProduct,deleteProduct,updateProduct}