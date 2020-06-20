const mongoose = require('mongoose')
const contactModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  body: String,
  date: {
    type: Date,
    default: new Date()
  }
})

exports.contactModel = mongoose.model('contact', contactModel)