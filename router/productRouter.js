const { addProduct, getProduct, getSingleProduct, deleteProduct, updateProduct } = require('../controller/productController')

const router = require('express').Router()

router.post('/addProduct',addProduct)

router.get('/getProduct',getProduct)

router.get('/getSingleProduct/:id',getSingleProduct)

router.delete('/deleteProduct/:id', deleteProduct)

router.put('/updateProduct/:id',updateProduct)




module.exports = router