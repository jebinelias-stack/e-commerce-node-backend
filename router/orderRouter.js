const { placeOrder, getOrder, getAllOrders, updateStatus, createRazorpayOrder, verifyPayment } = require('../controller/orderController')

const router = require('express').Router()


router.post('/placeOrder',placeOrder)

router.get('/getOrders/:userId',getOrder)

router.get('/getAllOrders',getAllOrders)

router.put('/updateStatus/:id',updateStatus)

router.post("/create-razorpay-order", createRazorpayOrder);

router.post("/verify-payment", verifyPayment);

module.exports = router