const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    res.send({
      status: false,
      msg: 'Token not found'
    })
  }

  try {
    const decoded = jwt.verify(token, 'secret')
    req.user = decoded.user
    console.log('middle', req.user)
    next()
  } catch (err) {
    res.send({
      status: false,
      msg: 'Invalid token'
    })
  }
}