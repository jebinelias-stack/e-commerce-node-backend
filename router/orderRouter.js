const { placeOrder, getOrder, getAllOrders, updateStatus } = require('../controller/orderController')

const router = require('express').Router()


router.post('/placeOrder',placeOrder)

router.get('/getOrders/:userId',getOrder)

router.get('/getAllOrders',getAllOrders)

router.put('/updateStatus/:id',updateStatus)


module.exports = router