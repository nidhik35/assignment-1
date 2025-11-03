const { request, response } = require("express")

const express=require('express')
const server=express()
server.use(express.json())  
//http://localhost:3000/login?email=nidhik@gmail.com&password=pass123
 server.post('/create_profile',(request,response)=>{  //api code
    //user data
     const email=request.body.email                                 //server side code
     let name=request.body.name
     const age=request.body.age
    
     console.log(email)
     console.log(name)
     console.log(age)
    
   
    
     
     //login logic
     if(email=="nidhik@gmail.com" && name=="nidhik" && age==19){
        response.send("profile created")
     }
     else{
             response.send("not created")
     }
     }
)

server.get('/create_profile',(request,response)=>{  //api code
    //user data
     const email=request.query.email                                 //server side code
    let name=request.get.name
     const age=request.get.age
    
     //login logic
     if(email=="nidhik@gmail.com" && name=="nidhik" && age==19){
        response.send("profile created")
     }
     else{
             response.send("not created")
     }
     }
)
server.get('/',(request,response)=>{
    response.send("nidhik")
})
 server.listen(3000,()=>{
    console.log('server started')
 })