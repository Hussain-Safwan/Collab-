const mongoose = require('mongoose')

const stream = mongoose.Schema({
  title: String,
  owner_id: String,
  owner_name: String,
  participents: [String],
  messages: [{
      sender_id: String,
      sender_name: String,
      text: String, 
      category: String
    }]
})

Stream = module.exports = mongoose.model('streams', stream)