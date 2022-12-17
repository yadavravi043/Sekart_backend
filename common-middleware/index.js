const jwt = require('jsonwebtoken')
exports.requireSignIn =(req,res,next)=>{
    if(req.headers.authorization){
        const token =req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.user=user
    }else{      
        return res.status(400).json({msg:"authorization required"})
    }
    next()
}
exports.adminMiddleWare=(req,res,next)=>{
    if(req.user.role !== 'admin'){
       return res.status(400).json({msg:"admin access denied"})
    }
    next()
}
exports.userMiddleWare=(req,res,next)=>{
    if(req.user.role !== 'user'){
       return res.status(400).json({msg:"user access denied"})
    }
    next()
}