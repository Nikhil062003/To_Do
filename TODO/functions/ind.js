const bodyParser = require("body-parser")
const express=require("express")
const app=express()
const fs=require("fs");
const Router=express.Router();
app.use(bodyParser.json());

Router.use(express.urlencoded({extended:true}))
let a=[];

Router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/dist/homepage.html')
})

Router.get('/addtask',(req,res)=>{
    res.sendFile(__dirname+'/dist/addtask.html');
})

Router.post('/addtask',(req,res)=>{
   //console.log(req.body.task);
   a.push({
        "task":req.body.task
    })
   fs.writeFile("j.json",JSON.stringify(a) ,"utf-8",(err,data)=>{
    
    res.sendFile(__dirname+'/dist/Taskadded.html');
   })
    
    
})

Router.get('/tasks',(req,res)=>{
   res.sendFile(__dirname+'/j.json');
})

Router.get('*',(req,res)=>{
  res.send('Page Not Found 404')
})


app.use('./netlify/functions/api',Router);
module.exports.handler=serverless(app);