const router = require('express').Router()
const {userModel} = require('../models/users')
const {check, validationResult} = require('express-validator/check')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

router.get('/',auth, async (req, res) => {
  const user = await userModel.findOne({_id: req.user.id})
  res.send(user)
})

router.post('/',
[
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Passwords msut be of minimum 6 characters').isLength({
    min: 6
  })
],
async (req, res) => {
  
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array()})
  }

  const {email, password} = req.body
  const user = await userModel.findOne({email})
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
      expiresIn: 360000
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

module.exports = router