const axios = require('axios');
const api = axios.create({
    baseURL: "http://localhost:4001/api/"
});

// var a = api.get(`constraints?where={"coeff1":${1},"coeff2":${1}, "rhs":${5}}`)
// console.log(a)
// console.log(a.dtype)
var b = new Promise();
console.log(b.dtype)

/*
axios.get("http://localhost:4001/api" + `/users?sort={"email": 1}`)
.then((res)=>{
    console.log(res.data);
})
.catch((err)=>{
    console.log(err);
})*/

// axios.post("http://localhost:4001/api" + `/users`,{
//     "email" : "test9@gmail.com",
//     "Fname" : "test",
//     "Lname" : "nine",
//     "address" : [123,123],
//     "placesVisited" : [],
//     "reviews" : []
// })
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

/*
axios({
    url: '/users',
    method: 'get',
    baseURL: 'http://localhost:4001/api',
    params : {
        sort : {"email": 1}
    }
})*/


/*
axios.post('http://localhost:4001/api/users').then((Response)=>{
    console.log(Response.data);
}).catch((Error)=>{
    console.log(Error);
})*/

