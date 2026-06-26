const { addCart, deleteCart, getCart, increaseQuantity, decreaseQuantity } = require('../controller/cartController')

const router = require('express').Router()


router.post('/addCart',addCart)

router.get('/getCart/:userId',getCart)

router.delete('/deleteCart/:cartId',deleteCart)

router.patch('/increase/:id',increaseQuantity)

router.patch('/decrease/:id',decreaseQuantity)



module.exports = router