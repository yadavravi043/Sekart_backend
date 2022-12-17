const express=require('express')
const { requireSignIn, adminMiddleWare } = require('../common-middleware')
const router=express.Router()
const {addProduct,getProduct}=require('../controller/category')

router.post('/product/create',requireSignIn,adminMiddleWare,  addProduct)
router.get('/product/getcategory',getProduct)
module.exports=router