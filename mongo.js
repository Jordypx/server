require("dotenv").config()

const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.MONGO_URL 
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique username "],
    unique: [true, "Username Exist"],
  },
  department: {
    type: String,
    required: [true, "Please provide the department"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
