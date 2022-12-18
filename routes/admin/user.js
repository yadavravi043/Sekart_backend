const express =require('express')
const router=express.Router()
const {Signup,Signin,Profile}=require('../../controller/admin/auth')
const {requireSignIn} =require('../../common-middleware/index')
const { validateSignupRequest, isRequesteValidated, validateSigninRequest } = require('../../validators/auth')


router.post('/signup',validateSignupRequest,isRequesteValidated ,Signup)
router.post('/signin',validateSigninRequest,isRequesteValidated ,Signin)
//  router.post('/profile',requireSignIn,  Profile)
module.exports=router