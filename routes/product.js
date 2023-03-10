const express=require('express')
const { requireSignIn, adminMiddleWare } = require('../common-middleware')
const router=express.Router()
const multer =require('multer')
const shortid=require('shortid')
const path=require('path')
const {createProduct,getProducts, getProductsBySlug}=require('../controller/product')


//we can see the uploaded file in folder(human readable)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
},
});
const upload = multer({storage });
//  const upload = multer({dest:'uploads/' });
  

//router.post('/create',requireSignIn,adminMiddleWare, upload.single('productPicture'), createProduct) //for single image
router.post('/product/create',requireSignIn,adminMiddleWare, upload.array('productPicture'), createProduct)  //for multiple image
router.post("/product/getProducts",requireSignIn,adminMiddleWare, getProducts);
router.get("/products/:slug", getProductsBySlug);

module.exports=router