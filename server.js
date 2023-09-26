const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const colors = require('colors');

const dotenv = require('dotenv');

const connectDB=require("./config/db");

//env Config
dotenv.config({path:'/'});
// It is in root directory ,  we can skip {path:'/'}

//router import
const  usersRoutes=require ('./routes/userRoutes');
const  blogRoutes=require('./routes/blogRoutes');





// rest object 
const app= express();

//middleware
app.use(cors());
app.use(express.json()); //Note: 07 
app.use(morgan('dev'));

///routes 
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/blog', blogRoutes);





//routes

app.get('/', (req,res)=>{
    res.status(200).send({"message":"Node Server"})
})

const PORT = process.env.PORT || 8080;
//listen 

app.listen(PORT,()=>{
    console.log(`Server listening on ${process.env.DEV_MODE} port ${PORT}`.bgMagenta.black);
})