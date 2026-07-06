const user = require("../models/userShema.js")
const argon =require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function signupData(req,res){
    try{
        req.body.password = await argon.hash(req.body.password)
        await user.create(req.body)
        return res.status(200).json(true)
    }catch(err){
        return res.status(401).json(err)
    }
}

async function singleData(req,res) {
    try{
        let DataBaseData = await user.findById(req.params.id)
        return res.status(200).json({userDetails:DataBaseData})
    }catch(err){
        return res.status(401).json(err)
    }
}


async function updateSingleData (req,res) {
    try{
        await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.status(200).json({userDetails:DataBaseData})
    }catch(err){
        return res.status(401).json(err)
    }
}

async function deleteSingleData(req,res) {
    try{
        let DataBaseData = await user.findByIdAndDelete(req.params.id)
        return res.status(200).json(true)
    }catch(err){
        return res.status(200).json(err)
    }
    
}



async function loginData(req,res) {
    try{
        let DataBaseData = await user.findOne({email:req.body.email})
        if(!DataBaseData){
            return res.status(401).json("Email not found")
        }if(await argon.verify(DataBaseData.password,req.body.password)){
            let token =await jwt.sign({id:DataBaseData._id},process.env.secKey,{expiresIn:'1h'})
            return res.status(200).json({message:"Login success",token,userId:DataBaseData._id,isAdmin:DataBaseData.isAdmin})
        }else{
            return res.status(401).json("Incorrect Password")
        }
    }catch(err){
        return res.status(401).json(err.message)
    }
}

async function adminLogin(req, res) {
    try {

        console.log("Request Body:", req.body);

        const { email, password } = req.body;

        const admin = await user.findOne({
            email,
            password,
            isAdmin: true
        });

        console.log("Admin Found:", admin);

        if (!admin) {
            return res.status(401).json("Invalid Admin Credentials");
        }

        return res.status(200).json(admin);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
}



module.exports = {signupData,singleData,updateSingleData,deleteSingleData,loginData,adminLogin}