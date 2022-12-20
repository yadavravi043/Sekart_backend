const express =require('express')
const router=express.Router()
const {signup,signin,Profile,signout}=require('../../controller/admin/auth')
const {requireSignIn} =require('../../common-middleware/index')
const { validateSignupRequest, isRequesteValidated, validateSigninRequest } = require('../../validators/auth')


router.post('/signup',validateSignupRequest,isRequesteValidated ,signup)
router.post('/signin',validateSigninRequest,isRequesteValidated ,signin)
router.post('/signout',signout)
//  router.post('/profile',requireSignIn,  Profile)
module.exports=router