const express = require("express")
const collection = require('./mongo.js')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const cors = require('cors');
const corsOptions ={
    origin:'https://client-wdmg.onrender.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/", (req,res)=>{
   
})

app.post('/login', async(req,res)=>{
    const{username,password} = req.body

    try {
        const check=await collection.findOne({username:username})

        if(check) {
            res.json("exist")
        }else {
            res.json("notexist")
        }
    } catch (error) {
        res.json("notexist")
    }
})

app.post('/signup', async(req,res)=>{
    const{email,username,password,firstName,lastName,department} = req.body

    const data ={
        email:email,
        username:username,
        password:password,
        firstName:firstName,
        lastName:lastName,
        department:department,
    }

    try {
        const check=await collection.findOne({username:username})

        if(check) {
            res.json("exist")
        }else {
            res.json("notexist")
            await collection.insertMany([data])
        }
    } catch (error) {
        res.json("notexist")
    }
})



app.listen(8000,()=>{
    console.log("port running")
})
