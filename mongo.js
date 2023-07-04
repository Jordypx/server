const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://kevinani:capplcproject@cluster0.kqhpj5k.mongodb.net/?retryWrites=true&w=majority").then(()=> {
    console.log("mongodb connected")
})
.catch(() =>{
    console.log("failed")
})

 const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique username "],
        unique: [true, "Username Exit"],
     },
     password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false
     },
     email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique : true
     },
     firstName: { type: String },
     lastName: { type: String },
     Department: { type: String }
})

const collection = mongoose.model('collection', newSchema);

module.exports = collection