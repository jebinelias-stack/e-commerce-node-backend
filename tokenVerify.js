const jwt = require("jsonwebtoken")
require('dotenv').config()


async function verifyToken (req,res,next){
    let token = req.headers.token
    console.log("verify token............... ", req.headers.token);
    if(token){
        await jwt.verify(token,process.env.secKey,(err,data)=>{
            if(err) return res.status(400).json('Invalid Token')
                if(req.body.id != data.id){
                    return res.status(400).json("doesnt match user and token")
                }
                next()
        })
    }
}

module.exports = {verifyToken}