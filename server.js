const express = require('express')
const mongoose =require('mongoose')
const app =express()
require('dotenv').config()
const port=process.env.PORT || 5000
const db=process.env.DATABASE
const cors=require('cors')
const bodyparser=require('body-parser')
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin/user')
const initialDataRoutes=require('./routes/admin/initialData')
const categoryRoutes =require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')
const pageRoutes=require('./routes/admin/page')
const path=require('path')

// app.use(bodyparser())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use(express.json())
app.use(cors())
app.use('/api',userRoutes)
app.use('/api/admin/initialdata',initialDataRoutes)
app.use('/api/page',pageRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api/user/cart',cartRoutes)









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