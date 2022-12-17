const express=require('express')
const { requireSignIn, adminMiddleWare } = require('../common-middleware')
const router=express.Router()
const {addCategory, getCategories}=require('../controller/category')

router.post('/category/create',requireSignIn,adminMiddleWare,  addCategory)
router.get('/category/getcategory',getCategories)
module.exports=router