const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();



//databse connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongo Databse Connected"))
.catch((err)=>console.log('Database not connected',err))

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))




app.use('/',require('./routes/auth_routes'))







const port = 8000;
app.listen(port,()=> console.log(`server is running on port: ${port}`))