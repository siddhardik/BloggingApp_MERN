const mongoose = require("mongoose");
const colors = require("colors");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));

const connectDB = mongoose.connection;

connectDB.on('error', console.error.bind(console, "Error connecting to MongoDB"));

connectDB.once('open', function(){
    console.log(`Connected to Mongodb Database ${mongoose.connection.host}`.bgBlue
    .white);
});

module.exports = connectDB;
