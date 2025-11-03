const express=require('express');
const server=express();
server.use(express.json())
const name="Nidhik"
const age=20
const dept="ISE"
const usn="4SF23IS061"
const sec="A"
server.post('/create-profile',(request,response)=>{
    //user data
    const name=request.body.name;
    const age=request.body.age;
    const dept=request.body.dept;
    const usn=request.body.usn;
    const sec=request.body.sec;
    response.send("profile created")
    /*console.log(email)
    console.log(password)
    //login logic
    if(email=="sanjana@gmail.com"&&password=="san26"){
        response.send('Login successfull')
    }
    else{
        response.send('login failed')
    }
        */
})
server.get('/create-profile',(request,response)=>{
    //user data
    const name=request.query.name;
    const age=request.query.age;
    const dept=request.query.dept;
      const usn=request.query.usn;
      const sec=request.query.sec;
      response.send(name+age+dept+usn+sec)
    //login logic
    /*if(email=="sanjana@gmail.com"&&password=="san26"){
        response.send('Login successfull')
    }
    else{
        response.send('login failed')
    }*/
})

server.get('/', (request,response) => {
    response.send('Nidhik')
})
server.listen(3000, () => {
    console.log("Server started")
})