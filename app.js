const { request, response } = require("express")
// let name="shravya shetty"
// const age= 19
// let skill=" javascript"
const express=require('express')
const server=express()
server.use(express.json())  
let students=[]
server.get('/students',(request,response)=>{
   response.send(students)
})
server.delete('/student/:usn',(request,response)=>{
   students=students.filter((student)=>
      student.usn != request.params.usn)
   response.send('student deleted')
})
server.post("/student/add",(request,response)=>{
   const{usn,name,age,phone}=request.body;


   students.push({
      usn,
      name,
      phone,
      age,
   })
   response.send("student added")
})







//http://localhost:3000/login?email=shravya@gmail.com&password=pass123
 server.post('/login',(request,response)=>{  //api code
    //user data
     const email=request.body.email                                 //server side code
     const password=request.body.password
     console.log(email)
     console.log(password)
     //login logic
     if(email=="shravya@gmail.com" && password=="pass123"){
        response.send("login successful")
     }
     else{
             response.send("login failed")
     }
     }
)

server.get('/login',(request,response)=>{  //api code
    //user data
     const email=request.query.email                                 //server side code
     const password=request.query.password
     //login logic
     if(email=="shravya@gmail.com" && password=="pass123"){
        response.send("login successful")
     }
     else{
             response.send("login failed")
     }
     }
)
server.get('/',(request,response)=>{
    response.send("shravya")
})
 server.listen(3000,()=>{
    console.log('server started')
 })