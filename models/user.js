const mongoose = require('mongoose')

const user = mongoose.Schema({
  name: String,
  email: String,
  password: String
})

User = module.exports = mongoose.model('users', user)