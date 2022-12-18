const express = require('express')
const mongoose =require('mongoose')
const app =express()
require('dotenv').config()
const port=process.env.PORT || 5000
const db=process.env.DATABASE
const bodyparser=require('body-parser')
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin/user')
const categoryRoutes =require('./routes/category')
const productRoutes=require('./routes/product')



// app.use(bodyparser())
app.use(express.json())
app.use('/api',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)









// app.get('/',(req,res)=>{
//     res.status(200).json({msg:"server get methood"})
// })
// app.post("/data",(req,res)=>{
//     const ans=req.body
//     res.status(200).json(ans)
// })
mongoose.set('strictQuery', true);
mongoose.connect(db)
.then(()=>{console.log(`Database connected successfully...`)})
.catch(()=>{console.log(`datbase connection failed`)})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})