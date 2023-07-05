const express = require("express")
const cors = require("cors")
const collection = require('./mongo.js')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.get("/", cors(), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://client-wdmg.onrender.com"); // Replace * with the appropriate origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send("OK");
});

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
    const{ email, department, username, password, firstName, lastName } = req.body

    const data ={
        email:email,
        department:department,
        username:username,
        password:password,
        firstName:firstName,
        lastName:lastName,
    }

    try {
        const check=await collection.findOne({username:username})

        if(check) {
            res.json("exist")
        }else {
            res.json("notexist")
            await collection.insertOne([data])
        }
    } catch (error) {
        res.json("notexist")
    }
})

app.listen(8000,()=>{
    console.log("port running")
})