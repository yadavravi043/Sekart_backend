const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

// const accessKeyId = process.env.accessKeyId;
// const secretAccessKey = process.env.secretAccessKey;

// const s3 = new aws.S3({
//   accessKeyId,
//   secretAccessKey,
// });
exports.upload = multer({ storage });
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