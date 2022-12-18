const express=require('express')
const { requireSignIn, userMiddleWare } = require('../common-middleware')
const router=express.Router()
const {addItemToCart}=require('../controller/cart')

router.post('/addtocart',requireSignIn,userMiddleWare,  addItemToCart)
module.exports=router