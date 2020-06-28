const router = require('express').Router()
const User = require('../models/user.js')
const auth = require('../config/auth.js')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (!user) {
    res.json('Email not found')
  } else if (user.password != password) {
    res.json('Incorrect password')
  } else {

    // jwt operation
    const payload = {
      user: {
        id: user._id
      }
    }
    let token
    jwt.sign(payload, 'secret', {
      expiresIn: 3600
    }, (err, tk) => {
      if (err) {
        res.json('JWT Error')
      } else {
        token = tk
        console.log(token)
        return res.send({
          msg: `Logged in as ${user.name}`,
          token
        })
      }
    })

  }
})

router.post('/register', async (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  console.log(user)
  await user.save()

  res.send({
    status: true,
    user,
    msg: 'registerred'
  })
})

router.get('/getUser', auth, async (req, res) => {
  const user = await User.findOne({_id: req.user.id})
  res.send(user)
})

router.get('/logout', async (req, res) => {
  req.logout()
  res.send({
    status: true,
    msg: 'logged out'
  })
})

module.exports = router