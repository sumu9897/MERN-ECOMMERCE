const express =require('express');
const router =require('./src/routes/api');
const app= new express();

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const  mongoSanitize = require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose');
const path = require("path");
const {route} = require("express/lib/router");

// Database Connection
let URI="mongodb+srv://mohammad:sumu9897@cluster0.tb1lx0x.mongodb.net/MernEcommerce";

let OPTION={user:'mohammad',pass:'sumu9897',autoIndex:true};

mongoose.connect(URI,OPTION).then((res)=>{
    console.log("DataBase Success")
}).catch((err)=>{
    console.log(err)
})


app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


app.use("/api/v1",route)

app.set('etag', false);

//
app.use(express.static('client/dist'));



// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})


module.exports=app;