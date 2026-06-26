const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
app.use(cors())
const routerpage = require('./router/userRouter.js')
const productrouterpage = require('./router/productRouter.js')
const cartrouterpage = require('./router/cartRouter.js')
const orderrouterpage = require('./router/orderRouter.js') 

mongoose.connect(process.env.mongoDBurl).then(()=>{
    console.log("Data base connected successfully");
}).catch((err)=>{
    console.log(err.message);
    
})


app.use(express.json())

app.use('/api',routerpage)
app.use('/product',productrouterpage)
app.use('/cart',cartrouterpage)
app.use('/order',orderrouterpage)


app.listen(3000,()=>{
    console.log("port is connected");
    
})