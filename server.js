const express = require('express');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');

const colors = require('colors');

const dotenv = require('dotenv');

const connectDB = require("./config/db");

//env Config
dotenv.config({ path: '/' });
// It is in root directory ,  we can skip {path:'/'}

//router import
const usersRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//Cors 

const corsOptions = {
    origin: 'https://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies, if needed
  };
  
  app.use(cors(corsOptions));



// rest object 
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //Note: 07 
app.use(morgan('dev'));

app.options('*', cors(corsOptions));

///routes 
app.use('/api/v1/users', usersRoutes);
// /api/v1/user => /api/v1/users
app.use('/api/v1/blog', blogRoutes);


//Static Files

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (req, res) {

    res.sendFile(path.join(__dirname, './client/build/index.html'));
}
)



//routes

app.get('/', (req, res) => {
    res.status(200).send({ "message": "Node Server" })
})

const PORT = process.env.PORT || 8080;
//listen 

app.listen(PORT, () => {
    // console.log(`Server listening on ${process.env.DEV_MODE} port ${PORT}`.bgMagenta.black);
})