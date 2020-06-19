const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: new Date()
  }
})

exports.userModel = mongoose.model('user', userModel)