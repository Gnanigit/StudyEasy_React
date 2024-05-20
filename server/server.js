import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";


const app=express();
const port=8080


const allowedOrigin = 'https://study-easy-react.vercel.app';
// uses
app.use(express.json({ limit: '100mb' }));
app.use(cors({
    origin: allowedOrigin
  }));
// app.use(cors())

app.use(morgan('tiny'))
app.disable('x-powered-by')    // less hackers know about our stack


app.use('/api',router)
// routes
app.get('/',(req,res)=>{
    res.status(201).json("Home GET Request");
})

// // api routes - middleware
// app.use('/api',router)



connect().then(()=>{
    try{
        app.listen(port,(err)=>{
            console.log(`Server connected to http://localhost:${port}`);
        })
    }
    catch(err){
        console.log("Cannot connect mongodb");
    }
}).catch(error=>{
    console.log("Invalid database connection");
})
