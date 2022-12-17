const {check, validationResult} =require('express-validator')
exports.validateSignupRequest=[
  check('firstName')
  .notEmpty()
  .withMessage("first name is required"),

  check('lastName')
  .notEmpty()
  .withMessage("last name is required")
,
  check('email')
  .isEmail()
  .withMessage("Valid email is required")
,
  check('password')
  .isLength({min:6})
  .withMessage("password must be atleat 6 character long")
]
exports.validateSigninRequest=[
  check('email')
  .isEmail()
  .withMessage("Valid email is required")
,
  check('password')
  .isLength({min:6})
  .withMessage("password must be atleat 6 character long")
]

exports.isRequesteValidated=(req,res,next)=>{
//it return array of error
const errors=validationResult(req)
if(errors.array().length >0){
    return res.status(400).json({error:errors.array()[0].msg})
}
    next()
}