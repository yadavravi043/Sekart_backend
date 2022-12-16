const express =require('express')
const router=express.Router()
const {Signup,Signin,Profile,requireSignIn}=require('../../controller/admin/auth')


router.post('/admin/signup',Signup)
router.post('/admin/signin',Signin)
 router.post('/profile',requireSignIn,  Profile)
module.exports=router