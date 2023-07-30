const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  todos: [{
    task: {
      type: String,
      required: true,
      trim: true
    },
    isCompleted: Boolean
  }]
})
const User = mongoose.model("User", userSchema)
module.exports = User