const express=require('express')
const { requireSignIn, adminMiddleWare } = require('../common-middleware')
const router=express.Router()
const {addCategory, getCategories}=require('../controller/category')

router.post('/create',requireSignIn,adminMiddleWare,  addCategory)
router.get('/getcategory',getCategories)
module.exports=router