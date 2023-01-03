const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken"); //for creating token
const expressJwt=require('express-jwt') //for verify token
const bcrypt = require("bcrypt");
exports.Signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async(error, user) => {
    if (user) {
      return res.status(400).json({ msg: "user already registered" });
    }
  const { firstName, lastName, email, password } = req.body;
  const hash_password = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    hash_password,
    username: shortId.generate(),
  });
  newUser.save((error, data) => {
    if (error) {
      return res.status(400).send(error);
    }
    if (data) {
      return res.status(201).json({ msg:"user created" });
    }
  });
});

};
exports.Signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (user) {
      if (user.authenticate(req.body.password) ) {
        const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'10d'});
        const {_id,firstName,lastName,fullname,email,role}=user
        res.status(200).json({token,user:{_id,firstName,lastName,fullname,email,role}})
      }else{
        res.status(400).json({msg:"invalid password"})
      }
    } else {
      res.status(400).json({ msg: "something went wrong" });
    }
  });
};


// exports.requireSignIn = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"]
// });
exports.Profile= (req,res)=>{
    res.status(200).send("profile hao")
}