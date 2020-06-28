module.exports = async (req, res, next) => {
  const User = require('../models/user.js')
  const { email, password } = req.body
  const user = await User.findOne({ email: email})
  if (user) {
    if (user.password === password) {
      req.user = user
      next()
    } else {
      res.send({
        status: false,
        msg: 'Incorrect Password'
      })
    }
  } else {
    res.send({
      status: false,
      msg: 'Email not found'
    })
  }
}