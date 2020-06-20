const mongoose = require('mongoose')
const url = `mongodb+srv://saf:home761049@cluster0-ov3aj.mongodb.net/mern?retryWrites=true&w=majority`
const dbConnect = () => {
    mongoose.connect(url, { useNewUrlParser: true },
      () => console.log("atlas db connected")
    );
  }

module.exports = dbConnect