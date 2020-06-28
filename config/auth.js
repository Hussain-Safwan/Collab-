const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    console.log('token not found')
    return res.send({
      status: false,
      msg: 'Token not found'
    })
  }

  const decoded = jwt.verify(token, 'secret')
    req.user = decoded.user
    console.log('middle', req.user)
    next()
}