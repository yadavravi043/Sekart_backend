const express =require('express')
const router=express.Router()
const {Signup,Signin,Profile,requireSignIn}=require('../controller/auth')


router.post('/signup',Signup)
router.post('/signin',Signin)
 router.post('/profile',requireSignIn,  Profile)
module.exports=router