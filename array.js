//let fruits=[];
//fruits.push('apple','orange','mango','guava')
//console.log(fruits)
//fruits.pop()
//console.log(fruits)
//fruits.shift()
//console.log(fruits)

let cars=['bmw','alto','balano','mg hector']
console.log(cars.length)
cars.map((car,index)=>{
    console.log(car+' '+index)
    if(car=='alto'){
        cars[index]='ferrari'
    }
})
cars=cars.filter((car,index)=>{
    return car != 'balano'
})
console.log(cars)
console.log(cars.indexOf('mg hector'))

let name="nidhi k"
let nameArray = name.split(" ")
console.log(nameArray)
console.log(cars.join("@"))

let student={
    "name":"nidhi k",
    "age":25,
    "skills":[
        "HTML","CSS"
    ]
}