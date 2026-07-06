const { signupData, loginData, singleData, updateSingleData, deleteSingleData, adminLogin } = require("../controller/userController")
const { verifyToken } = require("../tokenVerify")

const router = require("express").Router()


router.post('/signup',signupData)

router.get('/getSingleData/:id',verifyToken,singleData)

router.put('/updateSingleData/:id',updateSingleData)

router.delete('/deleteSingleData',deleteSingleData)

router.post('/login',loginData)

module.exports = router